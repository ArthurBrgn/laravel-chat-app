<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->displayName,
            'avatar' => $this->avatarUrl,
            'type' => $this->type,
            'last_message' => new MessageResource($this->whenLoaded('lastMessage')),
        ];
    }
}
