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
    use RefreshDatabase;

    protected $organization;
    protected $department;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test organization and department
        $this->organization = Organization::factory()->create();
        $this->department = Department::factory()->create([
            'organization_id' => $this->organization->id
        ]);
        
        // Seed roles and permissions
        $this->seed(RoleAndPermissionSeeder::class);
    }

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test.unique@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'department_id' => $this->department->id,
        ]);

        $response->assertRedirect(route('dashboard', absolute: false));

        $user = User::where('email', 'test.unique@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals($this->organization->id, $user->organization_id);
        $this->assertTrue($user->hasRole('employee-' . $this->organization->id));
        $this->assertAuthenticatedAs($user);
    }
}
