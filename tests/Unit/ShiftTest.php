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
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    protected $organization; // Variable to hold the test organization
    protected $department; // Variable to hold the test department
    protected $user; // Variable to hold the test user

    protected function setUp(): void
    {
        parent::setUp(); // Call the parent setUp method to ensure proper initialization
        // Create a test organization with a specific slug for consistent testing
        $this->organization = Organization::factory()->create(['slug' => 'shiftssync-demo']);
        // Create a test department associated with the created organization
        $this->department = Department::factory()->create(['organization_id' => $this->organization->id]);
        // Create a test user associated with the created organization and department
        $this->user = User::factory()->create([
            'organization_id' => $this->organization->id,
            'department_id' => $this->department->id
        ]);
    }

    // Test to verify that a shift can be created successfully
    public function test_can_create_shift()
    {
        // Data for the new shift
        $shiftData = [
            'title' => 'Test Shift', // Title of the shift
            'description' => 'Test Description', // Description of the shift
            'start_time' => now(), // Start time of the shift
            'end_time' => now()->addHours(8), // End time of the shift (8 hours later)
            'department_id' => $this->department->id, // Associate the shift with the created department
            'user_id' => $this->user->id, // Associate the shift with the created user
            'organization_id' => $this->organization->id, // Associate the shift with the created organization
            'required_employees' => 1, // Number of employees required for the shift
            'hourly_rate' => 15.00, // Hourly rate for the shift
            'status' => 'open' // Initial status of the shift
        ];

        // Create the shift using the provided data
        $shift = Shift::create($shiftData);

        // Assert that the shift was created in the database
        $this->assertDatabaseHas('shifts', [
            'title' => 'Test Shift', // Check for the shift's title
            'department_id' => $this->department->id // Check for the associated department ID
        ]);
        // Assert that the shift's title matches the expected title
        $this->assertEquals('Test Shift', $shift->title);
    }

    // Test to verify that a shift belongs to a department
    public function test_shift_belongs_to_department()
    {
        // Create a shift associated with the test department
        $shift = Shift::factory()->create([
            'department_id' => $this->department->id, // Associate with the created department
            'organization_id' => $this->organization->id, // Associate with the created organization
            'user_id' => $this->user->id // Associate with the created user
        ]);

        // Assert that the shift has an associated department
        $this->assertTrue($shift->department()->exists());
        // Assert that the department ID of the shift matches the expected department ID
        $this->assertEquals($this->department->id, $shift->department->id);
    }

    // Test to verify that a shift belongs to an organization
    public function test_shift_belongs_to_organization()
    {
        // Create a shift associated with the test organization
        $shift = Shift::factory()->create([
            'department_id' => $this->department->id, // Associate with the created department
            'organization_id' => $this->organization->id, // Associate with the created organization
            'user_id' => $this->user->id // Associate with the created user
        ]);

        // Assert that the shift has an associated organization
        $this->assertTrue($shift->organization()->exists());
        // Assert that the organization ID of the shift matches the expected organization ID
        $this->assertEquals($this->organization->id, $shift->organization_id);
    }

    // Test to verify that total hours and wage can be calculated correctly
    public function test_can_calculate_total_hours_and_wage()
    {
        // Create a shift with specific start and end times
        $shift = Shift::factory()->create([
            'department_id' => $this->department->id, // Associate with the created department
            'organization_id' => $this->organization->id, // Associate with the created organization
            'user_id' => $this->user->id, // Associate with the created user
            'start_time' => now(), // Start time of the shift
            'end_time' => now()->addHours(8), // End time of the shift (8 hours later)
            'hourly_rate' => 15.00 // Hourly rate for the shift
        ]);

        // Assert that the total hours calculated for the shift is correct
        $this->assertEquals(8, $shift->total_hours);
        // Assert that the total wage calculated for the shift is correct
        $this->assertEquals(120.00, $shift->total_wage);
    }

    // Test to verify that a shift can be updated successfully
    public function test_can_update_shift()
    {
        // Create a new organization and department for the shift
        $organization = Organization::factory()->create();
        $department = Department::factory()->create(['organization_id' => $organization->id]);
        // Create a shift with an initial title
        $shift = Shift::factory()->create([
            'department_id' => $department->id, // Associate with the created department
            'organization_id' => $organization->id, // Associate with the created organization
            'title' => 'Old Title' // Initial title of the shift
        ]);

        // Update the shift's title, description, and hourly rate
        $shift->update([
            'title' => 'Updated Title', // New title for the shift
            'description' => 'Updated Description', // New description for the shift
            'hourly_rate' => 25.00 // New hourly rate for the shift
        ]);

        // Assert that the shift's title has been updated correctly
        $this->assertEquals('Updated Title', $shift->fresh()->title);
        // Assert that the shift's description has been updated correctly
        $this->assertEquals('Updated Description', $shift->fresh()->description);
        // Assert that the shift's hourly rate has been updated correctly
        $this->assertEquals(25.00, $shift->fresh()->hourly_rate);
    }

    // Test to verify that a shift's status can be changed
    public function test_can_change_shift_status()
    {
        // Create a new organization and department for the shift
        $organization = Organization::factory()->create();
        $department = Department::factory()->create(['organization_id' => $organization->id]);
        // Create a shift with an initial status
        $shift = Shift::factory()->create([
            'department_id' => $department->id, // Associate with the created department
            'organization_id' => $organization->id, // Associate with the created organization
            'status' => 'open' // Initial status of the shift
        ]);

        // Update the shift's status to 'filled'
        $shift->update(['status' => 'filled']);
        // Assert that the shift's status has been updated correctly
        $this->assertEquals('filled', $shift->fresh()->status);
    }

    // Test to verify that a shift can be reassigned to a different department
    public function test_can_reassign_shift_to_different_department()
    {
        // Create a new organization and two departments for the shift
        $organization = Organization::factory()->create();
        $department1 = Department::factory()->create(['organization_id' => $organization->id]);
        $department2 = Department::factory()->create(['organization_id' => $organization->id]);
        
        // Create a shift associated with the first department
        $shift = Shift::factory()->create([
            'department_id' => $department1->id, // Associate with the first department
            'organization_id' => $organization->id // Associate with the created organization
        ]);

        // Update the shift to be associated with the second department
        $shift->update(['department_id' => $department2->id]);
        // Assert that the shift's department ID has been updated correctly
        $this->assertEquals($department2->id, $shift->fresh()->department_id);
    }
}
