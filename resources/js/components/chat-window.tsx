import { logout } from '@/routes';
import { Message, PaginatedResponse } from '@/types';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ChatWindow({
    conversationId,
}: {
    conversationId: number;
}) {
    const [messages, setMessages] = useState<Message[]>();

    useEffect(() => {
        if (!conversationId) return;

        fetch(`/conversations/${conversationId}`, {
            headers: { Accept: 'application/json' },
        })
            .then((res) => res.json() as Promise<PaginatedResponse<Message>>)
            .then((data) => setMessages(data.data));
    }, [conversationId]);

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <Link
            href={logout()}
            as="button"
            onClick={handleLogout}
            data-test="logout-button"
        >
            Log out
        </Link>
    );
}
