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
        $organizations = Organization::all();
        $departments = Department::all();

        // Create shifts for current month
        foreach ($organizations as $organization) {
            $orgDepartments = $departments->where('organization_id', $organization->id);
            $admins = User::role('administrator-' . $organization->id)->get();

            foreach ($orgDepartments as $department) {
                // Create morning shifts (8 AM - 4 PM)
                for ($i = 0; $i < 10; $i++) {
                    $startTime = Carbon::now()->addDays(rand(1, 30))->setHour(8)->setMinute(0);
                    $endTime = (clone $startTime)->addHours(8);

                    Shift::create([
                        'organization_id' => $organization->id,
                        'user_id' => $admins->random()->id,
                        'department_id' => $department->id,
                        'title' => 'Morning Shift - ' . $department->name,
                        'description' => 'Regular morning shift for ' . $department->name,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'required_employees' => rand(1, 3),
                        'hourly_rate' => rand(15, 25),
                        'status' => 'open',
                    ]);
                }

                // Create afternoon shifts (4 PM - 12 AM)
                for ($i = 0; $i < 10; $i++) {
                    $startTime = Carbon::now()->addDays(rand(1, 30))->setHour(16)->setMinute(0);
                    $endTime = (clone $startTime)->addHours(8);

                    Shift::create([
                        'organization_id' => $organization->id,
                        'user_id' => $admins->random()->id,
                        'department_id' => $department->id,
                        'title' => 'Afternoon Shift - ' . $department->name,
                        'description' => 'Regular afternoon shift for ' . $department->name,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'required_employees' => rand(1, 3),
                        'hourly_rate' => rand(20, 30),
                        'status' => 'open',
                    ]);
                }

                // Create night shifts (12 AM - 8 AM)
                for ($i = 0; $i < 5; $i++) {
                    $startTime = Carbon::now()->addDays(rand(1, 30))->setHour(0)->setMinute(0);
                    $endTime = (clone $startTime)->addHours(8);

                    Shift::create([
                        'organization_id' => $organization->id,
                        'user_id' => $admins->random()->id,
                        'department_id' => $department->id,
                        'title' => 'Night Shift - ' . $department->name,
                        'description' => 'Night shift for ' . $department->name,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'required_employees' => rand(1, 2),
                        'hourly_rate' => rand(25, 35),
                        'status' => 'open',
                    ]);
                }

                // Create some filled and cancelled shifts
                Shift::factory()
                    ->count(5)
                    ->filled()
                    ->create([
                        'organization_id' => $organization->id,
                        'user_id' => $admins->random()->id,
                        'department_id' => $department->id,
                    ]);

                Shift::factory()
                    ->count(3)
                    ->cancelled()
                    ->create([
                        'organization_id' => $organization->id,
                        'user_id' => $admins->random()->id,
                        'department_id' => $department->id,
                    ]);
            }
        }
    }
}