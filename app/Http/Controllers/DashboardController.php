<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\SearchConversationsRequest;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

final class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function home(SearchConversationsRequest $request): InertiaResponse
    {
        $search = $request->validated('search');

        $conversations = Auth::user()
            ->conversations()
            ->with(['lastMessage', 'users'])
            ->withMax('messages', 'created_at')
            ->when($search, function (Builder $query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhereHas('users', function ($q2) use ($search) {
                            $q2->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->orderByDesc('messages_max_created_at')
            ->take(25)
            ->get();

        return Inertia::render(
            'dashboard',
            ['conversations' => ConversationResource::collection($conversations)]
        );
    }

    public function conversation(Conversation $conversation)
    {
        $this->authorize('view', $conversation);

        $messages = $conversation->messages()
            ->with('user')
            ->latest()
            ->simplePaginate(50);

        return MessageResource::collection($messages);
    }

    public function sendMessage(SendMessageRequest $request, Conversation $conversation)
    {
        $this->authorize('sendMessage', $conversation);

        /** @var \App\Models\Message $message */
        $message = $conversation->messages()->create([
            'content' => $request->validated('content'),
            'user_id' => Auth::id(),
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return $message->load('user')->toResource();
    }
}
