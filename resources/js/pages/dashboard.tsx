import ChatWindow from '@/components/chat-window';
import Sidebar from '@/components/sidebar';
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
            <Sidebar
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                onConversationSelect={setSelectedConversationId}
            />
            <section>
                {selectedConversationId && (
                    <ChatWindow conversationId={selectedConversationId} />
                )}
            </section>
        </main>
    );
}
