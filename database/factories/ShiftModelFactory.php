<?php

namespace Database\Factories;

use App\Models\ShiftModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShiftModelFactory extends Factory
{
    // Specify the model that this factory is for
    protected $model = ShiftModel::class;

    // Define the model's default state
    public function definition()
    {
        return [
            // Generate a random employee name
            'employee_name' => $this->faker->name,
            // Generate a random pay rate between 10 and 100 with 2 decimal places
            'pay_rate' => $this->faker->randomFloat(2, 10, 100),
            // Generate a random shift date
            'shift_date' => $this->faker->date,
            // Generate a random start time for the shift
            'shift_startTime' => $this->faker->time,
            // Generate a random end time for the shift
            'shift_endTime' => $this->faker->time,
            // Generate a random location for the shift
            'shift_location' => $this->faker->city,
            // Generate a random department name
            'department' => $this->faker->word,
            // Randomly assign a status of either 'available' or 'claimed'
            'status' => $this->faker->randomElement(['available', 'claimed']),
        ];
    }
}