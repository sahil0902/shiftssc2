<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    // Define the model's default state
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(), // Generate a random name
            'email' => $this->faker->unique()->safeEmail(), // Generate a unique and safe email address
            'email_verified_at' => now(), // Set the email verification timestamp to the current time
            'password' => Hash::make('password'), // Hash the default password
            'remember_token' => Str::random(10), // Generate a random token for "remember me" functionality
            'department_id' => Department::factory(), // Create a new Department instance for the foreign key
            'organization_id' => Organization::factory(), // Create a new Organization instance for the foreign key
        ];
    }

    // Define a state for unverified users
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null, // Set email_verified_at to null for unverified users
        ]);
    }
}
