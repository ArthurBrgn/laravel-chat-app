<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ConversationType;
use Illuminate\Database\Eloquent\Model;

final class Conversation extends Model
{
    protected $casts = [
        'type' => ConversationType::class,
    ];
}
