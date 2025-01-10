<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        Organization::all()->each(function ($organization) {
            // Get roles
            $adminRole = Role::where('organization_id', $organization->id)
                            ->where('slug', 'admin')
                            ->first();
            
            $employeeRole = Role::where('organization_id', $organization->id)
                               ->where('slug', 'employee')
                               ->first();

            // Create admin users
            User::factory()
                ->count(2)
                ->create([
                    'organization_id' => $organization->id,
                    'role_id' => $adminRole->id,
                    'is_active' => true,
                ]);

            // Create employee users
            User::factory()
                ->count(5)
                ->create([
                    'organization_id' => $organization->id,
                    'role_id' => $employeeRole->id,
                    'is_active' => true,
                ]);
        });
    }
} 