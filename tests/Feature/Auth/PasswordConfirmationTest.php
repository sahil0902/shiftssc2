<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PasswordConfirmationTest extends TestCase
{
    use RefreshDatabase; // Use the RefreshDatabase trait to reset the database after each test

    // Test to ensure the confirm password screen can be rendered successfully
    public function test_confirm_password_screen_can_be_rendered(): void
    {
        $user = User::factory()->create(); // Create a new user using the factory

        // Act as the authenticated user and send a GET request to the confirm password page
        $response = $this->actingAs($user)->get('/confirm-password');

        // Assert that the response status is 200 (OK)
        $response->assertStatus(200);
    }

    // Test to verify that the password can be confirmed successfully
    public function test_password_can_be_confirmed(): void
    {
        $user = User::factory()->create(); // Create a new user using the factory

        // Act as the authenticated user and send a POST request to confirm the password
        $response = $this->actingAs($user)->post('/confirm-password', [
            'password' => 'password', // Use the correct password for confirmation
        ]);

        // Assert that the user is redirected after successful confirmation
        $response->assertRedirect();
        // Assert that there are no errors in the session
        $response->assertSessionHasNoErrors();
    }

    // Test to ensure that the password is not confirmed with an invalid password
    public function test_password_is_not_confirmed_with_invalid_password(): void
    {
        $user = User::factory()->create(); // Create a new user using the factory

        // Act as the authenticated user and attempt to confirm the password with an incorrect password
        $response = $this->actingAs($user)->post('/confirm-password', [
            'password' => 'wrong-password', // Use an incorrect password
        ]);

        // Assert that there are errors in the session due to invalid password
        $response->assertSessionHasErrors();
    }
}
