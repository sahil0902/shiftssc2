<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->department();
        return [
            'organization_id' => Organization::factory(),
            'name' => $name,
            'code' => Str::upper(Str::slug($name)),
            'description' => $this->faker->paragraph(),
            'manager_id' => null,
            'settings' => [
                'shift_overlap_allowed' => $this->faker->boolean(),
                'min_staff_per_shift' => $this->faker->numberBetween(1, 3),
                'max_staff_per_shift' => $this->faker->numberBetween(4, 10),
                'skills_required' => $this->faker->randomElements([
                    'customer_service',
                    'sales',
                    'technical',
                    'management',
                    'administrative',
                ], $this->faker->numberBetween(1, 3)),
            ],
            'is_active' => true,
        ];
    }

    public function inactive()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false,
            ];
        });
    }

    public function withManager()
    {
        return $this->state(function (array $attributes) {
            return [
                'manager_id' => User::factory(),
            ];
        });
    }
} 