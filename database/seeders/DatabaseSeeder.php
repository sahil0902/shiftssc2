<?php
// database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Department;
use App\Models\Organization;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create default organization
        $organization = Organization::create([
            'name' => 'Default Organization',
            'slug' => 'default-organization',
            'domain' => 'default.example.com',
            'settings' => [
                'theme' => [
                    'primary_color' => '#2563eb',
                    'secondary_color' => '#4f46e5'
                ],
                'notifications' => [
                    'email' => true,
                    'slack' => false
                ],
                'shift_settings' => [
                    'min_hours' => 4,
                    'max_hours' => 12,
                    'break_duration' => 1
                ]
            ]
        ]);

        // Create default roles
        $roles = [
            [
                'name' => 'Administrator',
                'description' => 'Full access to all features'
            ],
            [
                'name' => 'Manager',
                'description' => 'Can manage departments and shifts'
            ],
            [
                'name' => 'Employee',
                'description' => 'Can view and apply for shifts'
            ]
        ];

        foreach ($roles as $roleData) {
            Role::create([
                'name' => $roleData['name'],
                'guard_name' => 'web',
                'organization_id' => $organization->id
            ]);
        }

        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);
        $admin->assignRole('Administrator');

        // Create departments
        $departments = [
            'IT',
            'HR',
            'Finance',
            'Operations',
            'Sales',
        ];

        foreach ($departments as $name) {
            Department::create(['name' => $name]);
        }

        // Create employee users
        User::factory(10)->create([
            'role' => 'employee',
            'department_id' => fn() => Department::inRandomOrder()->first()->id,
        ])->each(function ($user) {
            $user->assignRole('Employee');
        });
    }
}