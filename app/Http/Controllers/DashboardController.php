<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\SearchConversationsRequest;
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
            ->when($search, function (Builder $query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhereHas('users', function ($q2) use ($search) {
                            $q2->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->simplePaginate(20);

        return Inertia::render(
            'dashboard',
            ['conversations' => ConversationResource::collection($conversations)]
        );
    }

    public function conversation(Conversation $conversation)
    {
        $messages = $conversation->messages()->latest()->simplePaginate(50);

        return MessageResource::collection($messages);
    }
}
