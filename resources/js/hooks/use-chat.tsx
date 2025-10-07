import { conversation } from '@/routes';
import { Message, PaginatedResponse } from '@/types';
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';

export default function useChat(conversationId: number) {
    const [messages, setMessages] = useState<Message[]>();
    const [nextLink, setNextLink] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchMessages = useCallback(
        async (firstFetch = false) => {
            const url = firstFetch
                ? conversation({ conversation: conversationId }).url
                : nextLink;

            if (!url) return;

            setIsLoading(true);
            try {
                const res = await axios.get<PaginatedResponse<Message>>(url, {
                    headers: { Accept: 'application/json' },
                });
                setMessages((prev) =>
                    firstFetch
                        ? res.data.data
                        : [...(prev ?? []), ...res.data.data],
                );
                setNextLink(res.data.links.next);
            } finally {
                setIsLoading(false);
            }
        },
        [conversationId, nextLink],
    );

    const handleScroll = useCallback(async () => {
        const container = containerRef.current;
        if (!container || !nextLink || isLoading) return;

        const distanceFromBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;

        if (distanceFromBottom > container.scrollHeight + 100) {
            await fetchMessages();
        }
    }, [nextLink, isLoading, fetchMessages]);

    return {
        messages,
        isLoading,
        containerRef,
        fetchMessages,
        handleScroll,
        setMessages,
    };
}
