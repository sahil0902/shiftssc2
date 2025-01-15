<?php

namespace Tests\Feature\Auth;

use App\Models\Department;
use App\Models\Organization;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class RegistrationTest extends TestCase
{
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    protected $organization; // Variable to hold the test organization
    protected $department; // Variable to hold the test department

    protected function setUp(): void
    {
        parent::setUp(); // Call the parent setUp method to ensure proper initialization
        
        // Create a test organization and department for the registration tests
        $this->organization = Organization::factory()->create(); // Create a new organization
        $this->department = Department::factory()->create([
            'organization_id' => $this->organization->id // Associate the department with the created organization
        ]);
        
        // Seed roles and permissions to ensure the necessary data is available for tests
        $this->seed(RoleAndPermissionSeeder::class);
    }

    // Test to ensure the registration screen can be rendered successfully
    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register'); // Send a GET request to the registration page

        $response->assertStatus(200); // Assert that the response status is 200 (OK)
    }

    // Test to verify that new users can register successfully
    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User', // Name of the user
            'email' => 'test.unique@example.com', // Unique email for the user
            'password' => 'password', // Password for the user
            'password_confirmation' => 'password', // Confirm the password
            'department_id' => $this->department->id, // Associate the user with the created department
        ]);

        $response->assertRedirect(route('dashboard', absolute: false)); // Assert that the user is redirected to the dashboard after registration

        // Retrieve the newly created user from the database
        $user = User::where('email', 'test.unique@example.com')->first();
        $this->assertNotNull($user); // Assert that the user was created successfully
        $this->assertEquals($this->organization->id, $user->organization_id); // Assert that the user's organization ID matches the created organization
        $this->assertTrue($user->hasRole('employee-' . $this->organization->id)); // Assert that the user has the correct role
        $this->assertAuthenticatedAs($user); // Assert that the user is authenticated
    }
}
