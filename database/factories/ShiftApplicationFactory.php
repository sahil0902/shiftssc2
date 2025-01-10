<?php

namespace Database\Factories;

use App\Models\Shift;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShiftApplicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'shift_id' => Shift::factory(),
            'user_id' => User::factory(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'notes' => $this->faker->optional()->paragraph(),
            'reviewed_at' => $this->faker->optional()->dateTimeBetween('-1 week', 'now'),
            'reviewed_by' => $this->faker->optional()->randomElement([User::factory()]),
        ];
    }

    public function pending(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'pending',
                'reviewed_at' => null,
                'reviewed_by' => null,
            ];
        });
    }

    public function approved(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'approved',
                'reviewed_at' => now(),
                'reviewed_by' => User::factory(),
            ];
        });
    }

    public function rejected(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'rejected',
                'reviewed_at' => now(),
                'reviewed_by' => User::factory(),
            ];
        });
    }
} 