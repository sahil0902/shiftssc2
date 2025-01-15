<?php

namespace Database\Factories;

use App\Models\Permission; // Import the Permission model for factory creation
use Illuminate\Database\Eloquent\Factories\Factory; // Import the Factory class for creating model factories
use Illuminate\Support\Str; // Import Str for string manipulation

class PermissionFactory extends Factory
{
    protected $model = Permission::class; // Specify the model that this factory is for

    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true); // Generate a unique name consisting of 3 words
        return [
            'name' => $name, // Set the 'name' attribute to the generated name
            'slug' => Str::slug($name), // Create a URL-friendly 'slug' from the name
            'description' => $this->faker->sentence(), // Generate a random sentence for the 'description'
        ];
    }
} 