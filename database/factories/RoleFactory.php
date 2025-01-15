<?php

namespace Database\Factories;

use App\Models\Role; // Import the Role model for factory creation
use App\Models\Organization; // Import the Organization model to associate roles with organizations
use Illuminate\Database\Eloquent\Factories\Factory; // Import the Factory class for creating model factories
use Illuminate\Support\Str; // Import Str for string manipulation

class RoleFactory extends Factory
{
    protected $model = Role::class; // Specify the model that this factory is for

    public function definition(): array
    {
        $name = $this->faker->unique()->jobTitle(); // Generate a unique job title for the role
        return [
            'organization_id' => Organization::factory(), // Create a new Organization instance for the foreign key
            'name' => $name, // Set the 'name' attribute to the generated job title
            'slug' => Str::slug($name), // Create a URL-friendly 'slug' from the job title
            'description' => $this->faker->sentence(), // Generate a random sentence for the 'description'
        ];
    }

    public function admin() // Define a state for the Administrator role
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Administrator', // Set the name to 'Administrator'
                'slug' => 'admin', // Set the slug to 'admin'
                'description' => 'Administrator role with full access', // Provide a description for the role
            ];
        });
    }

    public function manager() // Define a state for the Manager role
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Manager', // Set the name to 'Manager'
                'slug' => 'manager', // Set the slug to 'manager'
                'description' => 'Manager role with department management access', // Provide a description for the role
            ];
        });
    }

    public function employee() // Define a state for the Employee role
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Employee', // Set the name to 'Employee'
                'slug' => 'employee', // Set the slug to 'employee'
                'description' => 'Regular employee role', // Provide a description for the role
            ];
        });
    }
} 