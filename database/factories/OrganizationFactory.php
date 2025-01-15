<?php

namespace Database\Factories;

use App\Models\Organization; // Import the Organization model for factory creation
use Illuminate\Database\Eloquent\Factories\Factory; // Import the Factory class for creating model factories
use Illuminate\Support\Str; // Import Str for string manipulation

class OrganizationFactory extends Factory
{
    protected $model = Organization::class; // Specify the model that this factory is for

    public function definition(): array
    {
        $name = $this->faker->company(); // Generate a random company name using Faker
        return [
            'name' => $name, // Set the 'name' attribute to the generated company name
            'slug' => Str::slug($name), // Create a URL-friendly 'slug' from the company name
            'settings' => [ // Define the settings for the organization
                'allow_shift_swaps' => true, // Allow employees to swap shifts
                'require_manager_approval' => true, // Require manager approval for certain actions
                'default_hourly_rate' => $this->faker->randomFloat(2, 15, 50), // Generate a random hourly rate between 15 and 50
            ],
        ];
    }
} 