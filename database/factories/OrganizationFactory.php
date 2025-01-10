<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrganizationFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->unique()->company();
        $slug = Str::slug($name);
        
        return [
            'name' => $name,
            'slug' => $slug,
            'domain' => $slug . '.example.com',
            'logo_path' => null,
            'settings' => [
                'theme' => [
                    'primary_color' => $this->faker->hexColor(),
                    'secondary_color' => $this->faker->hexColor(),
                ],
                'notifications' => [
                    'email' => true,
                    'slack' => false,
                ],
                'shift_settings' => [
                    'min_hours' => 4,
                    'max_hours' => 12,
                    'break_duration' => 1,
                ],
            ],
        ];
    }
} 