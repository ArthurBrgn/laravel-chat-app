import { Conversation, PaginatedResponse } from '@/types';
import ConversationItem from './conversation-item';
import SearchConversationInput from './search-conversation-input';

type Props = {
    conversations: PaginatedResponse<Conversation>;
    selectedConversationId: number | null;
    onConversationSelect: (id: number) => void;
};

export default function Sidebar({
    conversations,
    selectedConversationId,
    onConversationSelect,
}: Props) {
    return (
        <aside className="w-80 bg-neutral-900 px-3 py-6">
            <SearchConversationInput />

            <section className="flex-1 space-y-2">
                {conversations.data.map((conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isSelected={conversation.id === selectedConversationId}
                        onSelect={() => {
                            onConversationSelect(conversation.id);
                        }}
                    />
                ))}
            </section>
        </aside>
    );
}
