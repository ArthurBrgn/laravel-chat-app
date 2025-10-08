<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Message
 *
 * @property-read int $id
 * @property-read string $content
 * @property-read int $conversation_id
 * @property-read int $user_id
 * @property-read string $created_at_for_humans
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 * @property-read Conversation $conversation
 * @property-read User $user
 */
final class Message extends Model
{
    public function createdAtForHumans(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->created_at->diffForHumans()
        );
    }

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(Reaction::class);
    }
}
