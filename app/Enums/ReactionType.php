<?php

declare(strict_types=1);

namespace App\Enums;

enum ReactionType: string
{
    case LIKE = 'LIKE';
    case LOVE = 'LOVE';
    case LAUGH = 'LAUGH';
    case ANGRY = 'ANGRY';
    case SAD = 'SAD';
    case WOW = 'WOW';
}
