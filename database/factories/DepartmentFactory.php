<?php

namespace Database\Factories;

use App\Models\Department; // Import the Department model
use App\Models\Organization; // Import the Organization model
use Illuminate\Database\Eloquent\Factories\Factory; // Import the Factory class for creating model factories

class DepartmentFactory extends Factory
{
    protected $model = Department::class; // Specify the model that this factory is for

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company(), // Generate a unique company name for the department
            'organization_id' => Organization::factory(), // Create a new Organization instance for the foreign key
            'allows_casual_shifts' => $this->faker->boolean(), // Randomly assign true or false for casual shifts
        ];
    }
} 