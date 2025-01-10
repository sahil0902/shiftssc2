<?php

namespace Database\Seeders;

use App\Models\Department;
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

        foreach ($departments as $department) {
            Department::create([
                'name' => $department,
            ]);
        }
    }
} 