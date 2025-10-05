import { Conversation } from '@/types';

export default function ConversationItem({
    conversation,
    onClick,
}: {
    conversation: Conversation;
    onClick?: () => void;
}) {
    return (
        <div
            key={conversation.id}
            className="cursor-pointer rounded-md p-2 hover:bg-neutral-700"
            onClick={onClick}
        >
            <div className="font-medium">{conversation.name}</div>
            <div className="truncate text-sm text-neutral-500">
                {conversation.last_message.content}
            </div>
        </div>
    );
}
