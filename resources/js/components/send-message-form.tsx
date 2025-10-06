import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { send } from '@/routes/messages';
import { Message } from '@/types';
import axios from 'axios';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    conversationId: number;
    onSendMessage: (message: Message) => void;
};

export default function SendMessageForm({
    conversationId,
    onSendMessage,
}: Props) {
    const [content, setContent] = useState('');
    const sendInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        sendInputRef.current?.focus();
    }, [conversationId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const { data: newMessage } = await axios.post<Message>(
                send({ conversation: conversationId }).url,
                { content },
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );

            setContent('');
            onSendMessage(newMessage);
            sendInputRef.current?.focus();
        } catch (error) {
            console.error('Erreur envoi message:', error);
        }
    };

    return (
        <form
            className="flex max-w-[75%] items-center gap-x-2"
            onSubmit={handleSubmit}
        >
            <Input
                ref={sendInputRef}
                type="text"
                placeholder="Envoyer un message"
                className="h-14 rounded-4xl border-0 bg-neutral-900 px-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <Button
                type="submit"
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-3xl bg-blue-600 transition duration-200 hover:bg-blue-800"
            >
                <Send />
            </Button>
        </form>
    );
}
