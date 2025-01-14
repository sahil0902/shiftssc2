<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Department;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DepartmentTest extends TestCase
{
    use RefreshDatabase;

    protected $organization;

    protected function setUp(): void
    {
        parent::setUp();
        $this->organization = Organization::factory()->create(['slug' => 'shiftssync-demo']);
    }

    public function test_can_create_department()
    {
        $departmentData = [
            'name' => 'Test Department',
            'organization_id' => $this->organization->id,
        ];

        $department = Department::create($departmentData);

        $this->assertDatabaseHas('departments', $departmentData);
        $this->assertEquals('Test Department', $department->name);
    }

    public function test_department_has_users()
    {
        $department = Department::factory()->create([
            'organization_id' => $this->organization->id
        ]);

        $user = User::factory()->create([
            'department_id' => $department->id,
            'organization_id' => $this->organization->id
        ]);

        $this->assertTrue($department->users->contains($user));
        $this->assertEquals(1, $department->users->count());
    }

    public function test_department_belongs_to_organization()
    {
        $department = Department::factory()->create([
            'organization_id' => $this->organization->id
        ]);

        $this->assertEquals($this->organization->id, $department->organization_id);
        $this->assertTrue($department->organization()->exists());
    }

    public function test_cannot_create_duplicate_department_in_same_organization()
    {
        $departmentName = 'Test Department';
        
        Department::create([
            'name' => $departmentName,
            'organization_id' => $this->organization->id,
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);

        Department::create([
            'name' => $departmentName,
            'organization_id' => $this->organization->id,
        ]);
    }

    public function test_can_update_department()
    {
        $organization = Organization::factory()->create();
        $department = Department::factory()->create([
            'organization_id' => $organization->id,
            'name' => 'Old Name'
        ]);

        $department->update([
            'name' => 'Updated Name',
            'allows_casual_shifts' => true
        ]);

        $this->assertEquals('Updated Name', $department->fresh()->name);
        $this->assertTrue($department->fresh()->allows_casual_shifts);
    }

    public function test_cannot_create_duplicate_department_name_in_same_organization()
    {
        $organization = Organization::factory()->create();
        Department::factory()->create([
            'organization_id' => $organization->id,
            'name' => 'Engineering'
        ]);

        $this->expectException(\Illuminate\Database\QueryException::class);
        
        Department::factory()->create([
            'organization_id' => $organization->id,
            'name' => 'Engineering'
        ]);
    }

    public function test_can_toggle_casual_shifts_setting()
    {
        $organization = Organization::factory()->create();
        $department = Department::factory()->create([
            'organization_id' => $organization->id,
            'allows_casual_shifts' => false
        ]);

        $department->update(['allows_casual_shifts' => true]);
        $this->assertTrue($department->fresh()->allows_casual_shifts);

        $department->update(['allows_casual_shifts' => false]);
        $this->assertFalse($department->fresh()->allows_casual_shifts);
    }
}
