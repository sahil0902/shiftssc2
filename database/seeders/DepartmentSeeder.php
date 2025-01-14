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
        $departments = [
            'Engineering',
            'Marketing',
            'Sales',
            'Human Resources',
            'Finance',
            'Operations',
        ];

        Organization::all()->each(function ($organization) use ($departments) {
            foreach ($departments as $department) {
                Department::create([
                    'name' => $department,
                    'organization_id' => $organization->id,
                ]);
            }
        });
    }
} 