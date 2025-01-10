<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShiftFactory extends Factory
{
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('now', '+30 days');
        $startTime = $this->faker->dateTimeBetween('08:00:00', '20:00:00');
        $endTime = clone $startTime;
        $endTime->modify('+' . $this->faker->numberBetween(2, 8) . ' hours');

        $skills = [
            'customer_service',
            'communication',
            'problem_solving',
            'teamwork',
            'time_management',
            'technical_skills',
            'leadership',
            'organization',
            'attention_to_detail',
            'adaptability',
        ];

        return [
            'organization_id' => Organization::factory(),
            'department_id' => Department::factory(),
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
            'pay_rate' => $this->faker->randomFloat(2, 15, 50),
            'shift_date' => $startDate,
            'shift_startTime' => $startTime->format('H:i:s'),
            'shift_endTime' => $endTime->format('H:i:s'),
            'break_duration' => $this->faker->randomFloat(2, 0.5, 1),
            'shift_location' => $this->faker->address(),
            'required_skills' => $this->faker->randomElements($skills, $this->faker->numberBetween(2, 5)),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'status' => $this->faker->randomElement(['draft', 'published', 'assigned', 'in_progress', 'completed', 'cancelled']),
            'published_at' => $this->faker->optional(0.7)->dateTimeBetween('-1 week', 'now'),
        ];
    }

    public function published(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'published',
                'published_at' => now(),
            ];
        });
    }

    public function draft(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'draft',
                'published_at' => null,
            ];
        });
    }

    public function assigned(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'assigned',
                'user_id' => User::factory(),
            ];
        });
    }
} 