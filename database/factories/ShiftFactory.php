<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShiftFactory extends Factory
{
    public function definition(): array
    {
        // Generate start time between now and next month, always rounding to nearest hour
        $startTime = Carbon::instance($this->faker->dateTimeBetween('now', '+1 month'))
            ->startOfHour();
        
        // Ensure start time is in the future
        if ($startTime->isPast()) {
            $startTime = Carbon::now()->addHours(rand(1, 24))->startOfHour();
        }

        // Generate shift duration between 2 to 8 hours
        $duration = rand(2, 8);
        $endTime = $startTime->copy()->addHours($duration);

        // Ensure minimum 2 hour difference and calculate duration
        if ($endTime->diffInHours($startTime) < 2) {
            $endTime = $startTime->copy()->addHours(2);
        }

        // Calculate hourly rate
        $hourlyRate = $this->faker->randomFloat(2, 15, 50);

        return [
            'user_id' => User::factory(),
            'department_id' => Department::factory(),
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'required_employees' => $this->faker->numberBetween(1, 5),
            'hourly_rate' => $hourlyRate,
            'status' => $this->faker->randomElement(['open', 'filled', 'cancelled']),
            // Add total_hours and total_wage fields if they exist in your shifts table
            'total_hours' => $endTime->diffInHours($startTime),
            'total_wage' => $hourlyRate * $endTime->diffInHours($startTime),
        ];
    }

    /**
     * Indicate that the shift is open.
     */
    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'open',
        ]);
    }

    /**
     * Indicate that the shift is filled.
     */
    public function filled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'filled',
        ]);
    }

    /**
     * Indicate that the shift is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }
}