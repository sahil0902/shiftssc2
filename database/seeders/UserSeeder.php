<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use App\Models\Department;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        Organization::all()->each(function ($organization) {
            // Create admin users with predictable emails
            for ($i = 1; $i <= 2; $i++) {
                User::factory()
                    ->create([
                        'organization_id' => $organization->id,
                        'password' => Hash::make('password'),
                        'email' => 'admin' . $i . '@' . $organization->domain,
                        'name' => 'Admin ' . $i . ' - ' . $organization->name,
                        'role' => 'admin'
                    ])
                    ->assignRole('administrator-' . $organization->id);
            }

            // Create employee users
            for ($i = 1; $i <= 5; $i++) {
                User::factory()
                    ->create([
                        'organization_id' => $organization->id,
                        'password' => Hash::make('password'),
                        'email' => 'employee' . $i . '@' . $organization->domain,
                        'name' => 'Employee ' . $i . ' - ' . $organization->name,
                        'role' => 'employee'
                    ])
                    ->assignRole('employee-' . $organization->id);
            }
        });
    }
} 