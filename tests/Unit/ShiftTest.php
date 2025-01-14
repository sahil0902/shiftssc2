<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Shift;
use App\Models\Department;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ShiftTest extends TestCase
{
    use RefreshDatabase;

    protected $organization;
    protected $department;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->organization = Organization::factory()->create(['slug' => 'shiftssync-demo']);
        $this->department = Department::factory()->create(['organization_id' => $this->organization->id]);
        $this->user = User::factory()->create([
            'organization_id' => $this->organization->id,
            'department_id' => $this->department->id
        ]);
    }

    public function test_can_create_shift()
    {
        $shiftData = [
            'title' => 'Test Shift',
            'description' => 'Test Description',
            'start_time' => now(),
            'end_time' => now()->addHours(8),
            'department_id' => $this->department->id,
            'user_id' => $this->user->id,
            'organization_id' => $this->organization->id,
            'required_employees' => 1,
            'hourly_rate' => 15.00,
            'status' => 'open'
        ];

        $shift = Shift::create($shiftData);

        $this->assertDatabaseHas('shifts', [
            'title' => 'Test Shift',
            'department_id' => $this->department->id
        ]);
        $this->assertEquals('Test Shift', $shift->title);
    }

    public function test_shift_belongs_to_department()
    {
        $shift = Shift::factory()->create([
            'department_id' => $this->department->id,
            'organization_id' => $this->organization->id,
            'user_id' => $this->user->id
        ]);

        $this->assertTrue($shift->department()->exists());
        $this->assertEquals($this->department->id, $shift->department->id);
    }

    public function test_shift_belongs_to_organization()
    {
        $shift = Shift::factory()->create([
            'department_id' => $this->department->id,
            'organization_id' => $this->organization->id,
            'user_id' => $this->user->id
        ]);

        $this->assertTrue($shift->organization()->exists());
        $this->assertEquals($this->organization->id, $shift->organization_id);
    }

    public function test_can_calculate_total_hours_and_wage()
    {
        $shift = Shift::factory()->create([
            'department_id' => $this->department->id,
            'organization_id' => $this->organization->id,
            'user_id' => $this->user->id,
            'start_time' => now(),
            'end_time' => now()->addHours(8),
            'hourly_rate' => 15.00
        ]);

        $this->assertEquals(8, $shift->total_hours);
        $this->assertEquals(120.00, $shift->total_wage);
    }

    public function test_can_update_shift()
    {
        $organization = Organization::factory()->create();
        $department = Department::factory()->create(['organization_id' => $organization->id]);
        $shift = Shift::factory()->create([
            'department_id' => $department->id,
            'organization_id' => $organization->id,
            'title' => 'Old Title'
        ]);

        $shift->update([
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'hourly_rate' => 25.00
        ]);

        $this->assertEquals('Updated Title', $shift->fresh()->title);
        $this->assertEquals('Updated Description', $shift->fresh()->description);
        $this->assertEquals(25.00, $shift->fresh()->hourly_rate);
    }

    public function test_can_change_shift_status()
    {
        $organization = Organization::factory()->create();
        $department = Department::factory()->create(['organization_id' => $organization->id]);
        $shift = Shift::factory()->create([
            'department_id' => $department->id,
            'organization_id' => $organization->id,
            'status' => 'open'
        ]);

        $shift->update(['status' => 'filled']);
        $this->assertEquals('filled', $shift->fresh()->status);
    }

    public function test_can_reassign_shift_to_different_department()
    {
        $organization = Organization::factory()->create();
        $department1 = Department::factory()->create(['organization_id' => $organization->id]);
        $department2 = Department::factory()->create(['organization_id' => $organization->id]);
        
        $shift = Shift::factory()->create([
            'department_id' => $department1->id,
            'organization_id' => $organization->id
        ]);

        $shift->update(['department_id' => $department2->id]);
        $this->assertEquals($department2->id, $shift->fresh()->department_id);
    }
}
