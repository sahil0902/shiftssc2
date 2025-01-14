<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Organization;
use App\Models\Shift;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ShiftSeeder extends Seeder
{
    public function run(): void
    {
        Organization::all()->each(function ($organization) {
            // Get departments for this organization
            $departments = Department::where('organization_id', $organization->id)->get();
            
            // Get users for this organization
            $users = User::where('organization_id', $organization->id)->get();
            
            // Create 5 shifts for each department
            $departments->each(function ($department) use ($users) {
                Shift::factory()->count(5)->create([
                    'department_id' => $department->id,
                    'organization_id' => $department->organization_id,
                    'user_id' => $users->random()->id,
                    'hourly_rate' => rand(15, 30),
                    'status' => 'open'
                ]);
            });
        });
    }
}