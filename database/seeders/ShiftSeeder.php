<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Shift;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some users with employee role
        $employees = User::role('employee')->get();
        
        if ($employees->isEmpty()) {
            // Create some employees if none exist
            $employees = collect([
                User::factory()->create(['name' => 'John Employee', 'email' => 'john@example.com']),
                User::factory()->create(['name' => 'Jane Employee', 'email' => 'jane@example.com']),
            ]);
            
            foreach ($employees as $employee) {
                $employee->assignRole('employee');
            }
        }

        // Get departments
        $departments = Department::all();
        
        if ($departments->isEmpty()) {
            // Create some departments if none exist
            $departments = collect([
                Department::create(['name' => 'Engineering']),
                Department::create(['name' => 'Marketing']),
                Department::create(['name' => 'Sales']),
            ]);
        }

        // Create shifts for the current month
        foreach (range(1, 10) as $i) {
            $startTime = Carbon::now()->addDays(rand(1, 30))->setHour(rand(8, 16));
            
            Shift::create([
                'user_id' => $employees->random()->id,
                'department_id' => $departments->random()->id,
                'title' => "Shift #$i",
                'description' => "Description for shift #$i",
                'start_time' => $startTime,
                'end_time' => $startTime->copy()->addHours(rand(4, 8)),
                'required_employees' => rand(1, 3),
                'status' => 'open',
            ]);
        }

        // Create some shifts for last month for comparison
        foreach (range(1, 8) as $i) {
            $startTime = Carbon::now()->subMonth()->addDays(rand(1, 28))->setHour(rand(8, 16));
            
            Shift::create([
                'user_id' => $employees->random()->id,
                'department_id' => $departments->random()->id,
                'title' => "Last Month Shift #$i",
                'description' => "Description for last month shift #$i",
                'start_time' => $startTime,
                'end_time' => $startTime->copy()->addHours(rand(4, 8)),
                'required_employees' => rand(1, 3),
                'status' => 'open',
            ]);
        }
    }
}