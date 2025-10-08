import { cn } from '@/lib/utils';
import { Message } from '@/types';

type Props = {
    message: Message;
    currentUserId: number;
};

export default function MessageItem({ message, currentUserId }: Props) {
    const isMine = message.user.id === currentUserId;

    return (
        <div
            className={cn(
                'w-fit max-w-lg rounded-lg px-3 py-2 break-words whitespace-pre-wrap',
                isMine ? 'self-end bg-blue-600' : 'self-start bg-neutral-900',
            )}
        >
            {!isMine && (
                <p className="text-base text-neutral-500">
                    {message.user.name} -{' '}
                    <span className="text-sm">
                        {message.created_at_for_humans}
                    </span>
                </p>
            )}
            <p>{message.content}</p>
        </div>
    );
}
