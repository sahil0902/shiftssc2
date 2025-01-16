
# ShiftsSync v2

  

A modern shift management system built with Laravel and React that helps organizations manage their employee shifts efficiently. The system allows administrators to create and manage shifts, while employees can view and apply for available shifts.

  


# ShiftsSync v2 - Setup Guide

## PHP Setup

```bash
# Install PHP dependencies
composer install

# Create and configure environment
cp .env.example .env
php artisan key:generate

# Database setup
php artisan migrate           # Run migrations
php artisan db:seed           # Seed database
php artisan migrate:fresh --seed  # Reset & seed database

```

## Node.js Setup

```bash
# Install dependencies
npm install

```

## Development Commands

```bash
# Build frontend for production
npm run build

# Start backend (Laravel) - First
php artisan serve

# Start frontend (Vite) - Open new terminal after php artisan serve and run 
npm run dev





```

## Database Reset & Cache Clearing

```bash
# Reset main database
php artisan migrate:fresh --seed

# Clear application cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Reset test database
php artisan migrate:fresh --seed --env=testing
```

## Testing

```bash
# Run all tests
php artisan test
# Run specific test suite
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit
```

  


## React


## Eloquent: Relationships


## Login,Registration and Authentication

## Profile

## Graphs

## Testing

  

my application includes comprehensive testing to ensure reliability and correct functionality. Here's an overview of our key test suites:

  

### Unit Tests

  

I have implemented several unit tests to verify core functionality:

  

```php

// UserTest.php - Password Hashing Test

public  function  test_password_is_hashed_when_set()

{

$user = User::factory()->create();

$plainPassword = 'password123';

$user->update([

'password' => Hash::make($plainPassword)

]);

$hashedPassword = $user->fresh()->password;

// Verify the password was hashed using Bcrypt

$this->assertTrue(str_starts_with($hashedPassword,  '$2y$'));

$this->assertTrue(Hash::check($plainPassword, $hashedPassword));

$this->assertNotEquals($plainPassword, $hashedPassword);

}

```

  

Key test observations:

-  **Password Security**: We verify that passwords are properly hashed using Bcrypt

-  **User Management**: Tests cover profile updates, role assignments, and organization relationships

-  **Department Logic**: Ensures departments are correctly associated with users and organizations

-  **Shift Management**: Validates shift creation, updates, and calculations

  

### Feature Tests

  

Our feature tests cover end-to-end functionality:

  

-  **Authentication**: Login, registration, and password management

-  **Profile Management**: Profile updates and account deletion

-  **Password Updates**: Comprehensive validation of password changes

  

Current test coverage:

- 62 tests passing

- 165 assertions

- Tests complete in ~2.4 seconds

  

These tests help us:

1. Catch bugs early in development

2. Ensure security features work correctly

3. Maintain code quality during updates

4. Verify business logic remains intact