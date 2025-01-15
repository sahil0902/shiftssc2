<?php

namespace Database\Factories;
/*
for future development
*/
use App\Models\Shift; // Import the Shift model for factory creation
use App\Models\User; // Import the User model for factory creation
use Illuminate\Database\Eloquent\Factories\Factory; // Import the base Factory class

class ShiftApplicationFactory extends Factory
{
    public function definition(): array
    {
        // Define the default state for a ShiftApplication model
        return [
            'shift_id' => Shift::factory(), // Create a new Shift instance for the foreign key
            'user_id' => User::factory(), // Create a new User instance for the foreign key
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']), // Randomly select a status
            'notes' => $this->faker->optional()->paragraph(), // Optionally generate a paragraph for notes
            'reviewed_at' => $this->faker->optional()->dateTimeBetween('-1 week', 'now'), // Optionally set a review date within the last week
            'reviewed_by' => $this->faker->optional()->randomElement([User::factory()]), // Optionally assign a reviewer
        ];
    }

    public function pending(): self
    {
        // Define a state for a pending shift application
        return $this->state(function (array $attributes) {
            return [
                'status' => 'pending', // Set status to 'pending'
                'reviewed_at' => null, // No review date for pending applications
                'reviewed_by' => null, // No reviewer for pending applications
            ];
        });
    }

    public function approved(): self
    {
        // Define a state for an approved shift application
        return $this->state(function (array $attributes) {
            return [
                'status' => 'approved', // Set status to 'approved'
                'reviewed_at' => now(), // Set the review date to the current time
                'reviewed_by' => User::factory(), // Assign a new User as the reviewer
            ];
        });
    }

    public function rejected(): self
    {
        // Define a state for a rejected shift application
        return $this->state(function (array $attributes) {
            return [
                'status' => 'rejected', // Set status to 'rejected'
                'reviewed_at' => now(), // Set the review date to the current time
                'reviewed_by' => User::factory(), // Assign a new User as the reviewer
            ];
        });
    }
} 