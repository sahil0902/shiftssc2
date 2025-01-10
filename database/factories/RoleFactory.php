<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->jobTitle();
        return [
            'organization_id' => Organization::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence(),
        ];
    }

    public function admin()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Administrator',
                'slug' => 'admin',
                'description' => 'Administrator role with full access',
            ];
        });
    }

    public function manager()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Manager',
                'slug' => 'manager',
                'description' => 'Manager role with department management access',
            ];
        });
    }

    public function employee()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Employee',
                'slug' => 'employee',
                'description' => 'Regular employee role',
            ];
        });
    }
} 