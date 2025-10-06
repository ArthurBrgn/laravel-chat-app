import { conversation } from '@/routes';
import { Message, PaginatedResponse, User } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import MessageItem from './message-item';
import SendMessageForm from './send-message-form';

type Props = {
    conversationId: number;
};

export default function ChatWindow({ conversationId }: Props) {
    const [messages, setMessages] = useState<Message[]>();
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!conversationId) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get<PaginatedResponse<Message>>(
                    conversation({ conversation: conversationId }).url,
                    { headers: { Accept: 'application/json' } },
                );

                setMessages(res.data.data);
                console.log(res.data);
            } catch (err) {
                console.error('Erreur chargement messages:', err);
            }
        };

        fetchMessages();
    }, [conversationId]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            // distance entre le scroll actuel et le bas réel du container
            const distanceFromBottom =
                container.scrollHeight -
                container.scrollTop -
                container.clientHeight;

            // On déclenche quand l’utilisateur est proche du bas réel du container
            if (distanceFromBottom > container.scrollHeight + 100) {
                console.log('Scroll en haut / chargement anciens messages');
            }
        };

        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);
    });

    return (
        <>
            <div className="flex h-full flex-col justify-end gap-y-4 px-4 py-4">
                <section
                    className="flex flex-col-reverse space-y-4 space-y-reverse overflow-y-auto px-4"
                    ref={messagesContainerRef}
                >
                    {messages?.map((message) => (
                        <MessageItem
                            key={message.id}
                            message={message}
                            currentUserId={auth.user.id}
                        />
                    ))}
                </section>

                <SendMessageForm
                    conversationId={conversationId}
                    onSendMessage={(newMessage: Message) =>
                        setMessages((prev) => [newMessage, ...(prev ?? [])])
                    }
                />
            </div>
        </>
    );
}
