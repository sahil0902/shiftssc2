<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Organization;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Organization::all()->each(function ($organization) {
            // Casual shift departments
            $casualDepartments = [
                'Retail',
                'Food Service',
                'Customer Service',
                'Warehouse',
                'Cleaning',
                'Security',
                'Events'
            ];

            // Create casual departments
            foreach ($casualDepartments as $name) {
                Department::create([
                    'organization_id' => $organization->id,
                    'name' => $name,
                    'allows_casual_shifts' => true
                ]);
            }
        });
    }
} 