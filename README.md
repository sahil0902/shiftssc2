# ShiftsSync v2

A modern shift management system built with Laravel and React that helps organizations manage their employee shifts efficiently. The system allows administrators to create and manage shifts, while employees can view and apply for available shifts.

## Quick Start

See [INSTRUCTIONS.md](INSTRUCTIONS.md) for detailed setup instructions.

## Testing

my application includes comprehensive testing to ensure reliability and correct functionality. Here's an overview of our key test suites:

### Unit Tests

I have implemented several unit tests to verify core functionality:

```php
// UserTest.php - Password Hashing Test
public function test_password_is_hashed_when_set()
{
    $user = User::factory()->create();
    $plainPassword = 'password123';
    
    $user->update([
        'password' => Hash::make($plainPassword)
    ]);
    
    $hashedPassword = $user->fresh()->password;
    
    // Verify the password was hashed using Bcrypt
    $this->assertTrue(str_starts_with($hashedPassword, '$2y$'));
    $this->assertTrue(Hash::check($plainPassword, $hashedPassword));
    $this->assertNotEquals($plainPassword, $hashedPassword);
}
```

Key test observations:
- **Password Security**: We verify that passwords are properly hashed using Bcrypt
- **User Management**: Tests cover profile updates, role assignments, and organization relationships
- **Department Logic**: Ensures departments are correctly associated with users and organizations
- **Shift Management**: Validates shift creation, updates, and calculations

### Feature Tests

Our feature tests cover end-to-end functionality:

- **Authentication**: Login, registration, and password management
- **Profile Management**: Profile updates and account deletion
- **Password Updates**: Comprehensive validation of password changes

Current test coverage:
- 62 tests passing
- 165 assertions
- Tests complete in ~2.4 seconds

These tests help us:
1. Catch bugs early in development
2. Ensure security features work correctly
3. Maintain code quality during updates
4. Verify business logic remains intact

