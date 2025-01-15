<?php

namespace Database\Factories;

use App\Models\Shift; // Import the Shift model for factory creation
use App\Models\Department; // Import the Department model to associate shifts with departments
use App\Models\Organization; // Import the Organization model to associate shifts with organizations
use App\Models\User; // Import the User model to associate shifts with users
use Illuminate\Database\Eloquent\Factories\Factory; // Import the base Factory class for creating model factories

class ShiftFactory extends Factory
{
    protected $model = Shift::class; // Specify the model that this factory is for

    public function definition(): array
    {
        // Generate a random start time for the shift between now and one month from now
        $startTime = $this->faker->dateTimeBetween('now', '+1 month');
        // Calculate the end time by adding a random number of hours (between 2 and 8) to the start time
        $endTime = (clone $startTime)->modify('+' . $this->faker->numberBetween(2, 8) . ' hours');
        
        return [
            'title' => $this->faker->jobTitle(), // Generate a random job title for the shift
            'description' => $this->faker->sentence(), // Generate a random sentence for the shift description
            'start_time' => $startTime, // Set the start time of the shift
            'end_time' => $endTime, // Set the end time of the shift
            'department_id' => Department::factory(), // Create a new Department instance for the foreign key
            'organization_id' => Organization::factory(), // Create a new Organization instance for the foreign key
            'user_id' => User::factory(), // Create a new User instance for the foreign key
            'required_employees' => $this->faker->numberBetween(1, 5), // Randomly assign the number of required employees (1 to 5)
            'hourly_rate' => $this->faker->randomFloat(2, 15, 50), // Generate a random hourly rate between 15 and 50
            'status' => $this->faker->randomElement(['open', 'filled', 'cancelled']), // Randomly select a status for the shift
            'total_hours' => 0, // Placeholder for total hours, will be calculated later
            'total_wage' => 0, // Placeholder for total wage, will be calculated later
        ];
    }
}