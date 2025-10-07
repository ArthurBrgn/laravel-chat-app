<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ConversationType;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Auth;

/**
 * @property-read int $id
 * @property-read ConversationType $type
 * @property-read string|null $name
 * @property-read string|null $avatar
 * @property-read \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Support\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|User[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|Message[] $messages
 * @property-read Message|null $lastMessage
 * @property-read string $displayName
 * @property-read string|null $avatarUrl
 */
final class Conversation extends Model
{
    protected $casts = [
        'type' => ConversationType::class,
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('joined_at')->withTimestamps();
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function lastMessage(): HasOne
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    protected function displayName(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                if ($this->users->count() > 2) {
                    return $this->name ?? 'Groupe';
                }

                return $this->users->where('id', '<>', Auth::id())
                    ->first()
                    ->name;
            }
        );
    }

    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: function (): ?string {
                if ($this->users->count() > 2) {
                    return $this->avatar;
                }

                return $this->users->where('id', '<>', Auth::id())
                    ->first()
                    ->avatar;
            }
        );
    }
}
