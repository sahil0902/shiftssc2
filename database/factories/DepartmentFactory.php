<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company(),
            'organization_id' => Organization::factory(),
            'allows_casual_shifts' => $this->faker->boolean(),
        ];
    }
} 