import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
                'transition-background-color flex cursor-pointer items-start gap-x-3 rounded-lg p-2 duration-200',
                isSelected ? 'bg-neutral-700' : 'hover:bg-neutral-800',
            )}
            onClick={onSelect}
        >
            <Avatar>
                {conversation.avatar ? (
                    <AvatarImage src={conversation.avatar} />
                ) : (
                    <AvatarFallback>
                        {conversation.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                )}
            </Avatar>
            <div className="min-w-0 flex-1">
                <div className="mb-1 truncate leading-none font-medium">
                    {conversation.name}
                </div>
                <div className="truncate text-sm text-neutral-500">
                    {conversation.last_message.content}
                </div>
            </div>
        </div>
    );
}
