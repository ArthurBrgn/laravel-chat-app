<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Conversation
 */
final class ConversationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->display_name,
            'avatar' => $this->avatar_url,
            'type' => $this->type,
            'last_message' => new MessageResource($this->whenLoaded('lastMessage')),
        ];
    }
}
