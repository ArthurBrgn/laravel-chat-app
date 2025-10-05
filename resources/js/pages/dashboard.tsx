import ChatWindow from '@/components/chat-window';
import ConversationItem from '@/components/conversation-item';
import SearchConversationInput from '@/components/search-conversation-input';
import { Conversation, PaginatedResponse } from '@/types';
import { useState } from 'react';

export default function Dashboard({
    conversations,
}: {
    conversations: PaginatedResponse<Conversation>;
}) {
    const [selectedConversationId, setSelectedConversationId] = useState<
        number | null
    >(null);

    return (
        <main className="flex h-screen">
            <aside className="w-80 bg-neutral-900 px-3 py-6">
                <SearchConversationInput />

                <section className="flex-1">
                    {conversations.data.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            onClick={() => {
                                console.log(conversation.id);
                                setSelectedConversationId(conversation.id);
                            }}
                        />
                    ))}
                </section>
            </aside>
            <section>
                {selectedConversationId && (
                    <ChatWindow conversationId={selectedConversationId} />
                )}
            </section>
        </main>
    );
}
