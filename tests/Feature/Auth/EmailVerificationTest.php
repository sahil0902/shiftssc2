<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    // Test to ensure the email verification screen can be rendered
    public function test_email_verification_screen_can_be_rendered(): void
    {
        $user = User::factory()->unverified()->create(); // Create an unverified user

        // Act as the user and send a GET request to the email verification page
        $response = $this->actingAs($user)->get('/verify-email');

        // Assert that the response status is 200 (OK)
        $response->assertStatus(200);
    }

    // Test to verify that the email can be successfully verified
    public function test_email_can_be_verified(): void
    {
        $user = User::factory()->unverified()->create(); // Create an unverified user

        Event::fake(); // Prevent actual event dispatching during the test

        // Generate a temporary signed URL for email verification
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60), // URL valid for 60 minutes
            ['id' => $user->id, 'hash' => sha1($user->email)] // Include user ID and hashed email
        );

        // Act as the user and send a GET request to the verification URL
        $response = $this->actingAs($user)->get($verificationUrl);

        // Assert that the Verified event was dispatched
        Event::assertDispatched(Verified::class);
        // Assert that the user's email is now verified
        $this->assertTrue($user->fresh()->hasVerifiedEmail());
        // Assert that the user is redirected to the dashboard with a verified query parameter
        $response->assertRedirect(route('dashboard', absolute: false).'?verified=1');
    }

    // Test to ensure that email is not verified with an invalid hash
    public function test_email_is_not_verified_with_invalid_hash(): void
    {
        $user = User::factory()->unverified()->create(); // Create an unverified user

        // Generate a temporary signed URL with an incorrect hash
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60), // URL valid for 60 minutes
            ['id' => $user->id, 'hash' => sha1('wrong-email')] // Use a wrong email hash
        );

        // Act as the user and send a GET request to the verification URL
        $this->actingAs($user)->get($verificationUrl);

        // Assert that the user's email is still not verified
        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }
}
