<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ConversationType;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $now = now();

        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        $alice = User::factory()->create([
            'name' => 'Alice Martin',
            'email' => 'alice@example.com',
            'password' => Hash::make('password'),
        ]);

        $bob = User::factory()->create([
            'name' => 'Bob Dupont',
            'email' => 'bob@example.com',
            'password' => Hash::make('password'),
        ]);

        $charlie = User::factory()->create([
            'name' => 'Charlie Moreau',
            'email' => 'charlie@example.com',
            'password' => Hash::make('password'),
        ]);

        $privateConversation = Conversation::create([
            'type' => ConversationType::PRIVATE,
            'name' => null,
        ]);

        $privateConversation->users()->attach([
            $testUser->id => ['joined_at' => $now],
            $alice->id => ['joined_at' => $now],
        ]);

        $privateMessages = [
            [
                'content' => 'Hi Alice! How are you doing?',
                'conversation_id' => $privateConversation->id,
                'user_id' => $testUser->id,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'content' => 'Hi! I\'m doing well, thanks. How about you?',
                'conversation_id' => $privateConversation->id,
                'user_id' => $alice->id,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'content' => 'Great too! Would you like to meet up for coffee this week?',
                'conversation_id' => $privateConversation->id,
                'user_id' => $testUser->id,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        Message::insert($privateMessages);

        $groupConversation = Conversation::create([
            'type' => ConversationType::GROUP,
            'name' => 'Development Team',
        ]);

        $groupConversation->users()->attach([
            $testUser->id => ['joined_at' => $now],
            $alice->id => ['joined_at' => $now],
            $bob->id => ['joined_at' => $now],
            $charlie->id => ['joined_at' => $now],
        ]);

        $groupMessages = [
            [
                'content' => 'Hello everyone! I\'ve finished implementing the chat functionality.',
                'conversation_id' => $groupConversation->id,
                'user_id' => $testUser->id,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'content' => 'Excellent work! Can you push to the develop branch?',
                'conversation_id' => $groupConversation->id,
                'user_id' => $alice->id,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'content' => 'Perfect, I\'ll test this on my side.',
                'conversation_id' => $groupConversation->id,
                'user_id' => $bob->id,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'content' => 'Thanks Bob! Should we meet for code review tomorrow?',
                'conversation_id' => $groupConversation->id,
                'user_id' => $testUser->id,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        Message::insert($groupMessages);
    }
}
