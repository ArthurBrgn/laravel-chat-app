import useChat from '@/hooks/use-chat';
import { useThrottleFn } from '@/hooks/use-throttle';
import { Message, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useEffect } from 'react';
import MessageItem from './message-item';
import SendMessageForm from './send-message-form';
import { Spinner } from './ui/spinner';

type Props = {
    conversationId: number;
};

export default function ChatWindow({ conversationId }: Props) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const {
        messages,
        isLoading,
        containerRef,
        fetchMessages,
        handleScroll,
        setMessages,
    } = useChat(conversationId);

    const throttledScroll = useThrottleFn(handleScroll, 1000);

    useEcho(`conversation.${conversationId}`, '.message.sent', (e: Message) => {
        setMessages((prev) => [e, ...(prev ?? [])]);
    });

    useEffect(() => {
        fetchMessages(true);
    }, [fetchMessages]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.addEventListener('scroll', throttledScroll);
        return () => container.removeEventListener('scroll', throttledScroll);
    }, [containerRef, throttledScroll]);

    return (
        <div className="flex h-full flex-col justify-end gap-y-4 px-4 py-4">
            <MessagesList
                messages={messages}
                currentUserId={auth.user.id}
                isLoading={isLoading}
            />
            <ChatInput
                conversationId={conversationId}
                onSendMessage={(msg) =>
                    setMessages((prev) => [msg, ...(prev ?? [])])
                }
            />
        </div>
    );
}

function MessagesList({
    messages,
    currentUserId,
    isLoading,
}: {
    messages?: Message[];
    currentUserId: number;
    isLoading: boolean;
}) {
    return (
        <section className="relative flex flex-col-reverse space-y-4 space-y-reverse overflow-y-auto">
            {messages?.map((message) => (
                <MessageItem
                    key={message.id}
                    message={message}
                    currentUserId={currentUserId}
                />
            ))}

            {isLoading && (
                <div className="sticky top-4 flex justify-center">
                    <div className="size-16 rounded-full bg-neutral-900 p-4">
                        <Spinner className="size-8 text-blue-600" />
                    </div>
                </div>
            )}
        </section>
    );
}

function ChatInput({
    conversationId,
    onSendMessage,
}: {
    conversationId: number;
    onSendMessage: (message: Message) => void;
}) {
    return (
        <SendMessageForm
            conversationId={conversationId}
            onSendMessage={onSendMessage}
        />
    );
}
