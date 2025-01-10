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
            // Get published shifts for this organization
            $publishedShifts = Shift::where('organization_id', $organization->id)
                ->where('status', 'published')
                ->get();

            // Get employees for this organization
            $employees = User::where('organization_id', $organization->id)
                ->whereHas('role', function ($query) {
                    $query->where('slug', 'employee');
                })
                ->get();

            // Create applications for each published shift
            $publishedShifts->each(function ($shift) use ($employees) {
                // Create 1-3 pending applications
                ShiftApplication::factory()
                    ->count(rand(1, 3))
                    ->pending()
                    ->create([
                        'shift_id' => $shift->id,
                        'user_id' => $employees->random()->id,
                    ]);

                // Create 0-2 approved applications
                if (rand(0, 1)) {
                    ShiftApplication::factory()
                        ->count(rand(1, 2))
                        ->approved()
                        ->create([
                            'shift_id' => $shift->id,
                            'user_id' => $employees->random()->id,
                        ]);
                }

                // Create 0-2 rejected applications
                if (rand(0, 1)) {
                    ShiftApplication::factory()
                        ->count(rand(1, 2))
                        ->rejected()
                        ->create([
                            'shift_id' => $shift->id,
                            'user_id' => $employees->random()->id,
                        ]);
                }
            });
        });
    }
} 