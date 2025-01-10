<?php

namespace Database\Factories;

use App\Models\ShiftModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShiftModelFactory extends Factory
{
    protected $model = ShiftModel::class;

    public function definition()
    {
        return [
            'employee_name' => $this->faker->name,
            'pay_rate' => $this->faker->randomFloat(2, 10, 100),
            'shift_date' => $this->faker->date,
            'shift_startTime' => $this->faker->time,
            'shift_endTime' => $this->faker->time,
            'shift_location' => $this->faker->city,
            'department' => $this->faker->word,
            'status' => $this->faker->randomElement(['available', 'claimed']),
        ];
    }
}