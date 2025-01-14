<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Shift;
use App\Models\ShiftApplication;
use App\Models\User;
use Illuminate\Database\Seeder;

class ShiftApplicationSeeder extends Seeder
{
    public function run(): void
    {
        Organization::all()->each(function ($organization) {
            // Get open shifts for this organization
            $openShifts = Shift::where('organization_id', $organization->id)
                ->where('status', 'open')
                ->get();

            // Get employees for this organization
            $employees = User::role('employee-' . $organization->id)->get();

            // Create applications for each open shift
            $openShifts->each(function ($shift) use ($employees) {
                // Get a random subset of employees for this shift
                $applicants = $employees->random(min(6, $employees->count()))->pluck('id')->toArray();
                $statuses = ['pending', 'approved', 'rejected'];
                $currentIndex = 0;

                // Create applications with different statuses
                foreach ($applicants as $employeeId) {
                    ShiftApplication::create([
                        'shift_id' => $shift->id,
                        'user_id' => $employeeId,
                        'status' => $statuses[$currentIndex % 3],
                        'notes' => fake()->optional()->paragraph(),
                        'reviewed_at' => fake()->optional()->dateTimeBetween('-1 week', 'now'),
                        'reviewed_by' => fake()->optional()->randomElement($employees->pluck('id')->toArray()),
                    ]);
                    $currentIndex++;
                }
            });
        });
    }
} 