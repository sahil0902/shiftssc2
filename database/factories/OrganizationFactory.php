<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrganizationFactory extends Factory
{
    protected $model = Organization::class;

    public function definition(): array
    {
        $name = $this->faker->company();
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'settings' => [
                'allow_shift_swaps' => true,
                'require_manager_approval' => true,
                'default_hourly_rate' => $this->faker->randomFloat(2, 15, 50),
            ],
        ];
    }
} 