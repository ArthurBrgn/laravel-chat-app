import { cn } from '@/lib/utils';
import { Conversation } from '@/types';

type Props = {
    conversation: Conversation;
    isSelected?: boolean;
    onSelect: () => void;
};

export default function ConversationItem({
    conversation,
    isSelected,
    onSelect,
}: Props) {
    return (
        <div
            key={conversation.id}
            className={cn(
                'transition-background-color cursor-pointer rounded-lg p-2 duration-200',
                isSelected ? 'bg-neutral-700' : 'hover:bg-neutral-800',
            )}
            onClick={onSelect}
        >
            <div className="font-medium">{conversation.name}</div>
            <div className="truncate text-sm text-neutral-500">
                {conversation.last_message.content}
            </div>
        </div>
    );
}
