
  

# ShiftsSync v2

  

**ShiftsSync v2** is a modern shift management system built with Laravel and React. It enables organisations to manage employee shifts efficiently using advanced features such as robust authentication, role-based authorisation, real-time search, interactive dashboard graphs, and a collaborative comments module.

  

----------

  

## Installation and Setup
### Backend Setup

```bash

# Install PHP dependencies

composer  install

  

# Configure environment

cp  .env.example  .env

php  artisan  key:generate

  

# Database setup
#it will also create test database along with real for testing 
php  artisan  migrate 

php  artisan  db:seed

```

  

### Frontend Setup

```bash

# Install Node dependencies

npm  install

npm install class-variance-authority

# Development - in a new terminal after php artisan serve

npm  run  dev

  
```

  

### Running Tests

```bash

# PHP tests

php  artisan  test

  

```

  

### Advanced Features Implementation

  

### 1. Authentication and Authorisation

  

ShiftsSync v2 leverages **Laravel Sanctum** for lightweight SPA and API authentication and **Spatie's Laravel Permission**for role-based control. This ensures that each user (Admin, Manager, Employee) accesses only their permitted features.

Laravel Sanctum simplifies authentication for single-page applications (SPAs) by providing a lightweight system for token issuance and session management, avoiding the complexities of traditional OAuth. It integrates with Spatie's Laravel Permission package to streamline role-based access control, ensuring users only access authorized features, thus enhancing security. The User model is structured with Eloquent relationships to manage user data efficiently, reducing redundancy and improving data integrity. However, Sanctum may not suit applications needing complex OAuth flows, and as the number of roles increases, management can become cumbersome. Despite these limitations, the combination of Sanctum and Spatie offers robust security, maintainability, and an improved user experience, making it a suitable choice for modern applications.
  

#### Core Components

  

-  **Laravel Sanctum for API and session authentication**

-  **Custom Role-Based Authorisation Middleware**

-  **Spatie’s Laravel Permission for streamlined role handling**

-  **Secure Password Management using Bcrypt**

  

#### 1.1 Authentication with Laravel Sanctum

  

Sanctum simplifies token issuance and session management without OAuth’s complexity.

  

-  **Configuration:**

Managed in `config/sanctum.php`, it controls `authenticate_session`, `encrypt_cookies`, and CSRF token validation.

```php:config/sanctum.php
return [

    'middleware' => [
        'authenticate_session' => Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
        'encrypt_cookies' => Illuminate\Cookie\Middleware\EncryptCookies::class,
        'validate_csrf_token' => Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
    ],

];
```


-  **User Model Setup:**

In `app/Models/User.php`, the model uses:

-  **Traits:**

-  `HasApiTokens` (API token management)

-  `HasRoles` (role integration from Spatie)

-  **Relationships:**

-  `department()`, `organisation()`, `shifts()`, `appliedShifts()`

-  **Role Check Methods:**

-  `isAdmin()`, `isEmployee()`

```php:app/Models/User.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'department_id',
        'organization_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the department that the user belongs to.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the organization that the user belongs to.
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Get the shifts associated with the user.
     */
    public function shifts()
    {
        return $this->hasMany(Shift::class);
    }

    /**
     * Get the shifts the user has applied for.
     */
    public function appliedShifts()
    {
        return $this->belongsToMany(Shift::class, 'shift_applications')
                    ->withPivot(['status'])
                    ->withTimestamps();
    }

    /**
     * Check if the user has admin role.
     */
    public function isAdmin()
    {
        return $this->hasRole('administrator');
    }

    /**
     * Check if the user has employee role.
     */
    public function isEmployee()
    {
        return $this->hasRole('employee');
    }
}
```

  

#### 1.2 Role-Based Authorisation Middleware

  

A custom middleware (`app/Http/Middleware/RoleMiddleware.php`) ensures routes are accessible only to properly authorised users.

  

-  **Authentication Check:**

Uses `Auth::check()` to verify login status and redirects unauthenticated users.

-  **Role Verification:**

Applies Spatie’s `hasAnyRole` to ensure the user holds a required role. Unauthorized users receive a 403 error.

-  **Middleware Registration:**

Registered in `app/Http/Kernel.php` with a key such as `'role'`, so routes can use the syntax `role:administrator,manager`.

```php:app/Http/Middleware/RoleMiddleware.php
<?php
...
class RoleMiddleware
{
 
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return redirect('login');
        }

        if (!Auth::user()->hasAnyRole($roles)) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
```

-  **Route Usage:**

In `routes/web.php`, protected routes (e.g., `/dashboard`) use both `'auth'` and `'role:administrator,manager'`middleware, while generic routes use only `'auth'`.

```php:app/Http/Kernel.php
protected $routeMiddleware = [
    // Other middleware...
    'role' => \App\Http\Middleware\RoleMiddleware::class,
];
```

  

#### 1.3 Spatie's Laravel Permission Integration

  

Spatie’s package simplifies role/permission management via the database.

  

-  **Installation:**

Installed via Composer, then configured using vendor publish and migration commands.

```bash
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

-  **Seeder:**

The `database/seeders/RoleAndPermissionSeeder.php` defines permissions and assigns them:

-  **Administrator:** All permissions.

-  **Manager:** Limited to dashboard and shift management.

-  **Employee:** Basic permissions like viewing dashboards.

```css

/* Example code for RoleAndPermissionSeeder */

```

-  **Role Assignment:**

During registration, users are validated, created with hashed passwords (`Hash::make()`), and assigned a role (e.g., `'employee'`).

```php:database/seeders/RoleAndPermissionSeeder.php
<?php
...
class RoleAndPermissionSeeder extends Seeder
{
    public function run()
    {
        // Define permissions
        $permissions = [
            'view-dashboard',
            'manage-users',
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',
            'manage-roles',
            'view-roles',
            'create-roles',
            'edit-roles',
            'delete-roles',
            'manage-shifts',
            'view-shifts',
            'create-shifts',
            'edit-shifts',
            'delete-shifts',
            'apply-to-shifts',
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles and assign existing permissions
        $adminRole = Role::create(['name' => 'administrator', 'guard_name' => 'web']);
        $adminRole->givePermissionTo($permissions);

        $managerRole = Role::create(['name' => 'manager', 'guard_name' => 'web']);
        $managerRole->givePermissionTo(['view-dashboard', 'manage-shifts', 'view-shifts']);

        $employeeRole = Role::create(['name' => 'employee', 'guard_name' => 'web']);
        $employeeRole->givePermissionTo(['view-dashboard', 'apply-to-shifts']);
    }
}
```
  

#### 1.4 Secure Password Management

  

Passwords are securely managed using Laravel’s built-in Bcrypt via `Hash::make()`.

  

```php:app/Http/Controllers/Auth/RegisteredUserController.php
<?php

use Illuminate\Support\Facades\Hash;

// Inside the store method
'user' => User::create([
    // Other user attributes...
    'password' => Hash::make($validated['password']),
    // ...
]),
```


  

#### 1.5 Remember Me Functionality

  

The login form in `resources/js/Pages/Auth/Login.jsx` includes a "Remember Me" option that:

  

- Uses Inertia’s `useForm` to track form state.

- Submits data to the login route, allowing persistent sessions.

  

```javascript:resources/js/Pages/Auth/Login.jsx
import { useForm } from '@inertiajs/inertia-react';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <form onSubmit={submit}>
            {/* Email Field */}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    required
                />
                {errors.email && <div className="error">{errors.email}</div>}
            </div>

            {/* Password Field */}
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    required
                />
                {errors.password && <div className="error">{errors.password}</div>}
            </div>

            {/* Remember Me Checkbox */}
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        onChange={e => setData('remember', e.target.checked)}
                    />
                    Remember Me
                </label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={processing}>Login</button>
        </form>
    );
};
```

  

**Observations:**

  

-  **Security:** Sanctum and Spatie ensure robust protection.

-  **Scalability:** Role-based access easily extends to new roles.

-  **User Experience & Maintainability:** Features and separation of concerns promote usability and straightforward updates.

  

----------

  

### 2. Database Design & Eloquent Relationships

  

ShiftsSync v2 employs a well-normalized database design (3NF) to ensure data integrity, efficient queries, and scalability. This approach solves the problem of data redundancy by ensuring that each piece of information is stored in only one place, which minimizes inconsistencies and simplifies data management. The use of Eloquent relationships allows for intuitive data retrieval and manipulation, making it easier to manage complex relationships between users, departments, organizations, and shifts. However, the limitation of this design is that it may introduce complexity in query construction, especially for developers unfamiliar with Eloquent's relationship handling. Despite this, the benefits of improved data integrity and maintainability outweigh the challenges, making it a suitable choice for a robust application.

  

#### Eloquent Model Relationships

  

The User model defines relationships with departments, organisations, and shifts (both one-to-many and many-to-many).

  
```php:app/Models/User.php
    /**
     * Get the department that the user belongs to.
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the shifts created by the user.
     */
    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }

    /**
     * Get the organization that the user belongs to.
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }
}
```  

#### Database Normalization (3NF)


The database adheres to the principles of the Third Normal Form (3NF), ensuring minimal redundancy and eliminating transitive dependencies. Here's how the design achieves 3NF:

1. **Elimination of Redundant Data:**
   - Each table represents a single entity. For example, user-related information resides exclusively in the `users` table, eliminating the need to store redundant department or organization details within the user records.

2. **Ensuring Functional Dependencies:**
   - All non-key attributes are fully functionally dependent on the primary key. In the `users` table, attributes like `email`, `password`, and `department_id` depend entirely on the `id` primary key.

3. **Removing Transitive Dependencies:**
   - There are no transitive dependencies where non-key attributes depend on other non-key attributes. For instance, in the `shifts` table, details like `department_id` and `organization_id` are directly linked to the `shift` entity, not indirectly through another attribute.

4. **Separation of Concerns:**
   - By segregating related data into distinct tables (e.g., separating `departments` from `organizations`), the design ensures that changes in one entity do not inadvertently affect another, promoting data integrity and ease of maintenance.

### Supporting Database Migrations and Factories

The database design is further reinforced by comprehensive migration files and model factories, which automate the creation and seeding of database tables and test data.

#### Example: Department Model and Factory

```php:app/Models/Department.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'organization_id',
        'allows_casual_shifts',
    ];

    protected $casts = [
        'allows_casual_shifts' => 'boolean',
    ];

    /**
     * Get the shifts for the department.
     */
    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }

    /**
     * Get the users for the department.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the organization that the department belongs to.
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
```

```php:database/factories/DepartmentFactory.php
<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company(),
            'organization_id' => Organization::factory(),
            'allows_casual_shifts' => $this->faker->boolean(),
        ];
    }
}
```

  

**Key Points:**

- The `Department` model defines relationships with `Shift`, `User`, and `Organization` models, ensuring that each department is linked to its respective organization and can have multiple shifts and users.
- The `DepartmentFactory` facilitates the creation of test departments with randomized but coherent data, such as unique company names and associations to randomly generated organizations.

----------

  

### 3. React Integration

  

ShiftsSync v2 utilizes Laravel Sanctum for lightweight authentication and Spatie's Laravel Permission for role-based access control, ensuring that users (Admins, Managers, Employees) can only access features they are authorized to use. This setup simplifies the authentication process for single-page applications (SPAs) while enhancing security and maintainability. However, it may not be suitable for applications requiring complex OAuth flows, and managing numerous roles can become cumbersome. Despite these limitations, the combination of Sanctum and Spatie provides a robust framework for secure and efficient user management.


  

#### Entry Point and Initialisation

  

-  **app.jsx:**

Uses `createInertiaApp` and `resolvePageComponent` to load React components dynamically, and renders with `createRoot` along with a custom progress indicator.

```javascript:resources/js/app.jsx

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'; 

// Creating the Inertia application
createInertiaApp({
    title: (title) => `${title} - ${appName}`, // Setting the document title with the app name
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.jsx`, 
            import.meta.glob('./pages/**/*.jsx'), 
        ),
    setup({ el, App, props }) { 
        const root = createRoot(el); // Creating a root for the React application

        root.render(<App {...props} />); // Rendering the main App component with props
    },
    progress: {
        color: '#4B5563', // Setting the progress bar color
    },
});
```
  

#### Layouts and Reusable Components

  

-  **AuthenticatedLayout.jsx:**

Manages a persistent navbar, dynamic header, footer, and toaster notifications.

```javascript:resources/js/Layouts/AuthenticatedLayout.jsx

export default function AuthenticatedLayout({ header, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />
      {header && (
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto py-8 px-4">
            {typeof header === 'string' ? <h2 className="text-3xl font-bold">{header}</h2> : header}
          </div>
        </header>
      )}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
```

-  **GuestLayout.jsx:**

Centers content for authentication pages, emphasizing branding.

```javascript:resources/js/Layouts/GuestLayout.jsx

export default function GuestLayout({ children }) {
  return (
   // Main container with a gradient background and minimum height for full screen
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
                {/* Logo and title section */}
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-block"> {/* Link to the homepage */}
                        <img 
                            src="/logos/logo.jpg"  // Logo image source
                            alt="ShiftsSync Logo"  // Alternative text for the logo
                            className="mx-auto h-24 w-auto" // Centering the logo with auto margins and setting its height
                        />
                        <h1 className="mt-4 text-3xl font-bold text-primary"> {/* Main title */}
                            ShiftsSync
                        </h1>
                        <p className="mt-1 text-sm text-gray-600"> {/* Subtitle with a brief description */}
                            Effortless Shift Management, Empowered Teams
                        </p>
                    </Link>
                </div>

                {/* Container for the children components with styling */}
                <div className="w-full max-w-md">
                    <div className="rounded-xl bg-white px-8 py-6 shadow-lg ring-1 ring-gray-200"> {/* Card-like appearance */}
                        {children} {/* Rendering child components passed to the layout */}
                    </div>
                </div>
            </div>
        </div>
    );
}
```

-  **Reusable Components:**

Examples include `PrimaryButton.jsx`, `DangerButton.jsx`, `TextInput.jsx`, `InputLabel.jsx`, and `DataTable.jsx` (for global filtering and pagination).

```javascript:resources/js/components/DataTable/DataTable.jsx
// DataTable.jsx
export function DataTable({
  columns,
  data,
  pageCount,
  pageSize = 10,
  pageIndex = 0,
  onPaginationChange,
  onSortingChange,
  onGlobalFilterChange,
  globalFilter = "",
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: { pageSize, pageIndex } },
    onPaginationChange,
    onSortingChange,
    manualPagination: true,
    pageCount,
  });

  return (
    <div className="space-y-4">
      {/* Global search */}
      <div className="flex justify-between">
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between py-4 space-x-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

  

#### Pages and Communication

  

Pages such as **Employees/Create.jsx**, **Departments/Index.jsx**, and **Profile/Edit.jsx** are implemented using Inertia’s `useForm` for real-time validation and dynamic interactions. Communication with the backend is handled by Inertia.js and Axios, which manage AJAX-based CRUD operations.

  

```javascript

/* Example code for posting form data using Inertia */
export default function Create({ auth, departments }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    department_id: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('employees.store'));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800">Create Employee</h2>}
    >
      <Head title="Create Employee" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg p-6">
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                <InputError message={errors.name} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                <InputError message={errors.email} />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <Select value={data.department_id} onValueChange={(value) => setData('department_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      new Map(departments.map((dept) => [dept.name, dept])).values()
                    ).map((department) => (
                      <SelectItem key={department.id} value={department.id.toString()}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputError message={errors.department_id} />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                <InputError message={errors.password} />
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                  Create Employee
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}  

```

  

**Hooks Utilized:**

React hooks like `useState`, `useEffect`, and Inertia's `useForm` maintain state, handle side effects, and ensure smooth data operations.
```javascript
      // Main functional component for displaying shifts
    
    export  default  function  Index({ can = {}, shifts = { data: [], current_page: 1, per_page: 10, last_page: 1, total: 0 } }) {
    
    const { auth, flash } = usePage().props; // Destructuring auth and flash messages from page props
    
      
    
    // Effect to show success or error messages based on flash data
    
    useEffect(() => {
    
    if (flash?.success) {
    
    toast.success(flash.success); // Show success toast
    
    }
    
    if (flash?.error) {
    
    toast.error(flash.error); // Show error toast
    
    }
    
    }, [flash]); // Dependency array to run effect when flash changes
```
----------

  

### Tailwind CSS Implementation

  

Tailwind CSS enables a utility-first design for responsive UIs.

  

-  **Configuration:**

The `tailwind.config.js` is extended for custom colors, fonts (e.g., Figtree), animations, and plugins such as `@tailwindcss/forms` and `tailwindcss-animate`.

```javascript
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ["class"],
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],
  theme: {
    container: {
      centre: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colours: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("tailwindcss-animate")
  ],
};

```

-  **Responsive Components:**

Tailwind classes (e.g., `hidden md:flex`, `hover:text-primary`) guarantee responsiveness across devices.

```javascript
// Navbar.jsx
import { Menu, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
  const { auth } = usePage().props;
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href={route('dashboard')} className="text-xl font-bold text-gray-800">
          ShiftsSync
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href={route('employees.index')} className="text-gray-700 hover:text-primary">Employees</Link>
          <Link href={route('departments.index')} className="text-gray-700 hover:text-primary">Departments</Link>
          <Link href={route('shifts.index')} className="text-gray-700 hover:text-primary">Shifts</Link>
        </div>
        <div className="flex items-center space-x-4">
          {auth.user ? (
            <>
              <span className="text-gray-700">Hello, {auth.user.name}</span>
              <Link href={route('logout')} className="text-gray-700 hover:text-red-600">Logout</Link>
            </>
          ) : (
            <>
              <Link href={route('login')} className="text-gray-700 hover:text-primary">Login</Link>
              <Link href={route('register')} className="text-gray-700 hover:text-primary">Register</Link>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-2">
                <Link href={route('employees.index')} className="text-gray-700 hover:text-primary">Employees</Link>
                <Link href={route('departments.index')} className="text-gray-700 hover:text-primary">Departments</Link>
                <Link href={route('shifts.index')} className="text-gray-700 hover:text-primary">Shifts</Link>
                {auth.user && (
                  <>
                    <Link href={route('profile.edit')} className="text-gray-700 hover:text-primary">Profile</Link>
                    <Link href={route('logout')} className="text-gray-700 hover:text-red-600">Logout</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

```

  

----------

  

### Unit Testing

ShiftsSync v2 employs PHPUnit for backend testing to ensure comprehensive test coverage, facilitating early bug detection and maintaining code quality. However, this testing strategy can introduce complexity in managing the testing framework and may require additional setup and maintenance efforts. Despite these limitations, the benefits of improved reliability and confidence in the codebase outweigh the challenges.

  

-  **Test Frameworks and Tools:**

Utilise PHPUnit’s `RefreshDatabase` trait, realistic database factories, and mocking of external dependencies.

-  **Test Structure:**

Unit tests validate individual models, while feature tests cover complete workflows (authentication, registration, profile updates).

  

```php
// tests/Feature/Auth/AuthenticationTest.php
namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }

    public function test_users_can_authenticate(): void
    {
        $user = User::factory()->create();
        $response = $this->post('/login', [
            'email'    => $user->email,
            'password' => 'password',
        ]);
        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard'));
    }

    public function test_users_cannot_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();
        $this->post('/login', [
            'email'    => $user->email,
            'password' => 'wrong-password',
        ]);
        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/logout');
        $this->assertGuest();
        $response->assertRedirect('/');
    }
}

```
----------

  

### Advanced Git Branching Strategy

  

ShiftsSync v2 employs a branching strategy that supports parallel development:

  

-  **Feature Branches:** E.g., `feature/apply-accept-shifts` isolate new features.

-  **Fix Branches:** E.g., `fix/navigation-and-permissions` address bugs.

-  **Backup/Demo Branches:** Provide staging and risk-free environments.

  

Combined with robust pull request processes, this strategy ensures organized code reviews and smooth integrations.

  

----------

  

### Comments Feature on Shifts

  

The comments module enhances collaboration by letting users add and view comments on shifts.

  

#### Overview

  

-  **Adding and Viewing Comments:**

Users can submit feedback or queries, with comments showing the commenter’s name, timestamp, and message..

  

#### Implementation

  

-  **Frontend:**

The Shift Show page (using React and Inertia.js) displays shift details alongside a comment form.

```jsx
// Excerpt from resources/js/pages/Shifts/Show.jsx

{/* Comments Section */}
<div className="mt-8">
  <div className="mb-4 rounded-md bg-blue-50 p-4">
    <p className="text-sm text-blue-700">
      Please add a comment, and your manager will contact you if you get the shift.
    </p>
  </div>
  
  <h3 className="text-lg font-medium">Comments</h3>
  <div className="mt-4 space-y-4">
    {shift.comments?.length ? (
      shift.comments.map((comment) => (
        <Card key={comment.id} className="p-4">
          <p className="text-sm font-medium text-gray-900">
            {comment.user?.name || 'Unknown User'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {format(new Date(comment.created_at), 'PPp')}
          </p>
          <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
        </Card>
      ))
    ) : (
      <p className="text-sm text-gray-500">No comments yet.</p>
    )}

    <form onSubmit={handleSubmit} className="mt-6">
      <Textarea
        value={data.content}
        onChange={(e) => setData('content', e.target.value)}
        placeholder="Add a comment..."
        className="mt-1"
      />
      {errors.content && (
        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
      )}
      <Button type="submit" className="mt-4" disabled={processing}>
        {processing ? 'Adding...' : 'Add Comment'}
      </Button>
    </form>
  </div>
</div>

```
```jsx
// Excerpt from resources/js/pages/Shifts/Show.jsx
const { data, setData, post, processing, errors } = useForm({
  content: '',
});

const handleSubmit = (e) => {
  e.preventDefault();
  post(route('shifts.addComment', shift.id), { onSuccess: () => setData('content', '') });
};

```

-  **Backend:**

The `ShiftComment` model defines fillable fields and relationships with Shift and User. The `ShiftController`handles form submission, input validation, and persistence.

```php
// Excerpt from app/Models/ShiftComment.php
class ShiftComment extends Model
{
    use HasFactory;
    protected $fillable = ['shift_id', 'user_id', 'content'];
    protected $with = ['user'];
    protected $casts = ['created_at' => 'datetime', 'updated_at' => 'datetime'];

    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

```
```php
// Excerpt from app/Http/Controllers/ShiftController.php
public function addComment(Request $request, Shift $shift)
{
    $validated = $request->validate(['content' => 'required|string']);
    $shift->comments()->create([
        'user_id' => Auth::id(),
        'content' => $validated['content']
    ]);
    return redirect()->back()->with('success', 'Comment added successfully.');
}

```
  

**Security Considerations:**

All inputs are validated, authenticated, and CSRF-protected by Inertia.js. Error handling ensures users receive prompt feedback.

  

----------

  

### Dashboard Graphs & Real-Time Search

  

#### Dashboard Graphs

  

The Dashboard displays key metrics:

  

-  **Shifts Distribution by Department**

-  **Shifts Status Breakdown**

  

**Backend:**

The `DashboardController` aggregates data (using indexed Eloquent queries) and passes it via Inertia.js.

  

```php
// app/Models/Department.php
class Department extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name', 'organization_id', 'allows_casual_shifts'];
    protected $casts = ['allows_casual_shifts' => 'boolean'];

    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}

```

  

**Frontend:**

Responsive charts are rendered using Recharts, styled with Tailwind CSS.

  

```jsx
// resources/js/pages/Dashboard.jsx
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard({ auth, shiftStats, stats }) {
  return (
    <AuthenticatedLayout user={auth.user} header={`Welcome, ${auth.user.name}`}>
      <Head title="Dashboard" />
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shifts Distribution by Department */}
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-lg font-semibold mb-4">Shifts by Department</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shiftStats.byDepartment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Shifts Status Breakdown */}
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-lg font-semibold mb-4">Shifts Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shiftStats.byStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

```


  

#### Real-Time Search

  

Real-Time Search dynamically filters shifts as users type:

  

-  **Backend:**

The search endpoint leverages Eloquents relationship and paginates results.

```php
// Display a listing of shifts

public  function  index()

{

// Fetch shifts with their associated department

$shifts = Shift::with(['department'])

// Filter shifts based on user role

->when(Auth::user()->role === 'employee', function ($query) {

// Exclude shifts already applied for by the user and only show open shifts

return $query->whereDoesntHave('applications', function ($q) {

$q->where('user_id', Auth::id());

})->where('status', 'open');

})

->latest() // Order shifts by the latest

->paginate(10) // Paginate results, 10 per page

->through(function ($shift) {

// Transform shift data for the view

return [

...$shift->toArray(),

'formatted_hourly_rate' => $shift->formatted_hourly_rate, // Format hourly rate

'formatted_total_wage' => $shift->formatted_total_wage, // Format total wage

'duration_in_hours' => $shift->duration, // Include duration in hours

];

});

  

// Render the shifts index view with the shifts data and permissions

return  Inertia::render('Shifts/Index', [

'shifts' => $shifts,

'can' => [

'create_shift' => Auth::user()->role === 'admin'  // Check if user can create shifts

],

'flash' => [

'success' => session('success'), // Flash success message

'error' => session('error') // Flash error message

],

]);

}
```

-  **Frontend:**

A debounced search input triggers asynchronous updates using React hooks and Inertia.js.

```jsx
// resources/js/pages/Shifts/Index.jsx
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Index({ shifts, search }) {
    const [searchTerm, setSearchTerm] = useState(search);
    const { auth } = usePage().props;

    const onSearchInputChange = (e) => setSearchTerm(e.target.value);

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                value={searchTerm}
                onChange={onSearchInputChange}
                placeholder="Search shifts..."
                className="w-full p-2 border rounded-md"
            />
            {/* DataTable receives filtered data based on search input */}
            <DataTable
                data={shifts.data || []}
                searchKey="title"
                pagination={{
                    pageIndex: shifts.current_page - 1,
                    pageSize: shifts.per_page,
                    pageCount: shifts.last_page,
                    total: shifts.total,
                }}
            />
        </div>
    );
}

```
  

----------

  

## Conclusion

  

ShiftsSync v2 demonstrates cutting-edge Laravel and React practices to deliver a secure, scalable, and user-friendly shift management system. With robust authentication, flexible role-based authorisation, efficient database design, responsive React components, and a sleek Tailwind CSS interface, the application is both highly maintainable and prepared for future growth. Comprehensive testing and a disciplined Git branching strategy further support its reliability and smooth evolution.