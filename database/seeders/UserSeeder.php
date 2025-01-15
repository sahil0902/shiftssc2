<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
use App\Models\Department;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        Organization::all()->each(function ($organization) {
            // Get departments for this organization
            $departments = Department::where('organization_id', $organization->id)->get();

            // Create admin user with unique email
            User::factory()->create([
                'name' => 'Admin - ' . $organization->name,
                'email' => 'admin' . $organization->id . '@example.com',
                'department_id' => $departments->random()->id,
                'organization_id' => $organization->id,
                'role' => 'admin'
            ]);

            // Create 5 regular users with unique emails
            User::factory()->count(5)->create([
                'department_id' => $departments->random()->id,
                'organization_id' => $organization->id,
                'role' => 'employee'
            ]);
        });
    }
} 