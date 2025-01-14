<?php

namespace Database\Factories;

use App\Models\Shift;
use App\Models\Department;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShiftFactory extends Factory
{
    protected $model = Shift::class;

    public function definition(): array
    {
        $startTime = $this->faker->dateTimeBetween('now', '+1 month');
        $endTime = (clone $startTime)->modify('+' . $this->faker->numberBetween(2, 8) . ' hours');
        
        return [
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->sentence(),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'department_id' => Department::factory(),
            'organization_id' => Organization::factory(),
            'user_id' => User::factory(),
            'required_employees' => $this->faker->numberBetween(1, 5),
            'hourly_rate' => $this->faker->randomFloat(2, 15, 50),
            'status' => $this->faker->randomElement(['open', 'filled', 'cancelled']),
            'total_hours' => 0, // Will be calculated
            'total_wage' => 0, // Will be calculated
        ];
    }
}