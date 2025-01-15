<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Department;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DepartmentTest extends TestCase
{
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    protected $organization; // Variable to hold the test organization

    protected function setUp(): void
    {
        parent::setUp(); // Call the parent setUp method to ensure proper initialization
        // Create a test organization with a specific slug for consistent testing
        $this->organization = Organization::factory()->create(['slug' => 'shiftssync-demo']);
    }

    // Test to verify that a department can be created successfully
    public function test_can_create_department()
    {
        // Data for the new department
        $departmentData = [
            'name' => 'Test Department', // Name of the department
            'organization_id' => $this->organization->id, // Associate with the created organization
        ];

        // Create the department using the provided data
        $department = Department::create($departmentData);

        // Assert that the department was created in the database
        $this->assertDatabaseHas('departments', $departmentData);
        // Assert that the department's name matches the expected name
        $this->assertEquals('Test Department', $department->name);
    }

    // Test to ensure that a department can have users associated with it
    public function test_department_has_users()
    {
        // Create a department associated with the test organization
        $department = Department::factory()->create([
            'organization_id' => $this->organization->id
        ]);

        // Create a user associated with the created department and organization
        $user = User::factory()->create([
            'department_id' => $department->id,
            'organization_id' => $this->organization->id
        ]);

        // Assert that the department contains the created user
        $this->assertTrue($department->users->contains($user));
        // Assert that the count of users in the department is as expected
        $this->assertEquals(1, $department->users->count());
    }

    // Test to verify that a department belongs to an organization
    public function test_department_belongs_to_organization()
    {
        // Create a department associated with the test organization
        $department = Department::factory()->create([
            'organization_id' => $this->organization->id
        ]);

        // Assert that the department's organization ID matches the expected organization ID
        $this->assertEquals($this->organization->id, $department->organization_id);
        // Assert that the department has an associated organization
        $this->assertTrue($department->organization()->exists());
    }

    // Test to ensure that duplicate departments cannot be created in the same organization
    public function test_cannot_create_duplicate_department_in_same_organization()
    {
        $departmentName = 'Test Department'; // Name for the department
        
        // Create the first department
        Department::create([
            'name' => $departmentName,
            'organization_id' => $this->organization->id,
        ]);

        // Expect a database query exception when trying to create a duplicate department
        $this->expectException(\Illuminate\Database\QueryException::class);

        // Attempt to create a duplicate department
        Department::create([
            'name' => $departmentName,
            'organization_id' => $this->organization->id,
        ]);
    }

    // Test to verify that a department can be updated successfully
    public function test_can_update_department()
    {
        // Create a new organization for the department
        $organization = Organization::factory()->create();
        // Create a department with an initial name
        $department = Department::factory()->create([
            'organization_id' => $organization->id,
            'name' => 'Old Name'
        ]);

        // Update the department's name and casual shifts setting
        $department->update([
            'name' => 'Updated Name', // New name for the department
            'allows_casual_shifts' => true // Update casual shifts setting
        ]);

        // Assert that the department's name has been updated correctly
        $this->assertEquals('Updated Name', $department->fresh()->name);
        // Assert that the casual shifts setting has been updated correctly
        $this->assertTrue($department->fresh()->allows_casual_shifts);
    }

    // Test to ensure that duplicate department names cannot be created in the same organization
    public function test_cannot_create_duplicate_department_name_in_same_organization()
    {
        // Create a new organization for the department
        $organization = Organization::factory()->create();
        // Create a department with a specific name
        Department::factory()->create([
            'organization_id' => $organization->id,
            'name' => 'Engineering'
        ]);

        // Expect a database query exception when trying to create a duplicate department
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        // Attempt to create a duplicate department
        Department::factory()->create([
            'organization_id' => $organization->id,
            'name' => 'Engineering'
        ]);
    }

    // Test to verify that the casual shifts setting can be toggled
    public function test_can_toggle_casual_shifts_setting()
    {
        // Create a new organization for the department
        $organization = Organization::factory()->create();
        // Create a department with casual shifts disabled
        $department = Department::factory()->create([
            'organization_id' => $organization->id,
            'allows_casual_shifts' => false
        ]);

        // Update the department to enable casual shifts
        $department->update(['allows_casual_shifts' => true]);
        // Assert that the casual shifts setting is now enabled
        $this->assertTrue($department->fresh()->allows_casual_shifts);

        // Update the department to disable casual shifts
        $department->update(['allows_casual_shifts' => false]);
        // Assert that the casual shifts setting is now disabled
        $this->assertFalse($department->fresh()->allows_casual_shifts);
    }
}
