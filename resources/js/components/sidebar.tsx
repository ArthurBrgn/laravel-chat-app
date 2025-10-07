import { useDebounceFn } from '@/hooks/use-debounce';
import { home, logout } from '@/routes';
import { Conversation, PaginatedResponse } from '@/types';
import { Link, router } from '@inertiajs/react';
import { LogOutIcon } from 'lucide-react';
import { useState } from 'react';
import ConversationItem from './conversation-item';
import { Input } from './ui/input';

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
        <aside className="flex w-80 flex-col bg-neutral-900 px-3 py-6">
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

            <div className="mt-auto">
                <Link
                    href={logout().url}
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-full bg-neutral-800 px-4 py-2 text-neutral-300 ring-neutral-700 transition duration-200 hover:ring-2"
                >
                    Log out
                    <LogOutIcon size={18} />
                </Link>
            </div>
        </aside>
    );
}

function SearchConversationInput() {
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value);

        router.get(home(), value.trim().length ? { search: value } : {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['conversations'],
        });
    };

    const debouncedSearch = useDebounceFn(handleSearch, 300);

    return (
        <Input
            type="text"
            placeholder="Search"
            className="mb-4"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                debouncedSearch(e.target.value);
            }}
        />
    );
}
