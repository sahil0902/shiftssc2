<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    // Test to ensure the reset password link screen can be rendered successfully
    public function test_reset_password_link_screen_can_be_rendered(): void
    {
        $response = $this->get('/forgot-password'); // Send a GET request to the forgot password page

        $response->assertStatus(200); // Assert that the response status is 200 (OK)
    }

    // Test to verify that a reset password link can be requested
    public function test_reset_password_link_can_be_requested(): void
    {
        Notification::fake(); // Prevent actual notifications from being sent

        $user = User::factory()->create(); // Create a new user using the factory

        $this->post('/forgot-password', ['email' => $user->email]); // Send a POST request to request a password reset link

        Notification::assertSentTo($user, ResetPassword::class); // Assert that a ResetPassword notification was sent to the user
    }

    // Test to ensure the reset password screen can be rendered successfully
    public function test_reset_password_screen_can_be_rendered(): void
    {
        Notification::fake(); // Prevent actual notifications from being sent

        $user = User::factory()->create(); // Create a new user using the factory

        $this->post('/forgot-password', ['email' => $user->email]); // Request a password reset link

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
            $response = $this->get('/reset-password/'.$notification->token); // Send a GET request to the reset password page with the token

            $response->assertStatus(200); // Assert that the response status is 200 (OK)

            return true; // Return true to indicate the assertion passed
        });
    }

    // Test to verify that the password can be reset with a valid token
    public function test_password_can_be_reset_with_valid_token(): void
    {
        Notification::fake(); // Prevent actual notifications from being sent

        $user = User::factory()->create(); // Create a new user using the factory

        $this->post('/forgot-password', ['email' => $user->email]); // Request a password reset link

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $response = $this->post('/reset-password', [
                'token' => $notification->token, // Use the token from the notification
                'email' => $user->email, // Use the user's email
                'password' => 'password', // New password
                'password_confirmation' => 'password', // Confirm the new password
            ]);

            $response
                ->assertSessionHasNoErrors() // Assert that there are no errors in the session
                ->assertRedirect(route('login')); // Assert that the user is redirected to the login page

            return true; // Return true to indicate the assertion passed
        });
    }
}
