<?php
// database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create organizations first
        $this->call(OrganizationSeeder::class);

        // Create departments
        $this->call(DepartmentSeeder::class);

        // Create roles and permissions
        $this->call(RoleAndPermissionSeeder::class);

        // Create users (including admins and employees)
        $this->call(UserSeeder::class);

        // Create shifts
        $this->call(ShiftSeeder::class);

        // Create shift applications
        $this->call(ShiftApplicationSeeder::class);
    }
}