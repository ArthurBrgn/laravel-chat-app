import { logout } from '@/routes';
import { Conversation, PaginatedResponse } from '@/types';
import { Link, router } from '@inertiajs/react';
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
    const handleLogout = () => {
        router.flushAll();
    };

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

            <Link
                href={logout()}
                as="button"
                onClick={handleLogout}
                data-test="logout-button"
            >
                Log out
            </Link>
        </aside>
    );
}
