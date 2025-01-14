# ShiftSync - System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Database Structure](#database-structure)
4. [Authentication & Authorization](#authentication--authorization)
5. [Page Structure & Routes](#page-structure--routes)
6. [Components](#components)
7. [API Endpoints](#api-endpoints)
8. [Common Issues & Solutions](#common-issues--solutions)

## System Overview


ShiftSync is a shift management system built with Laravel (backend) and React/Inertia.js (frontend). It features:
- Multi-tenant architecture with organization support
- Role-based access control
- Shift management
- Employee management
- Department management
- Real-time statistics and reporting

## Architecture

### Backend (Laravel)
- Models: Located in `app/Models/`
- Controllers: Located in `app/Http/Controllers/`
- Migrations: Located in `database/migrations/`
- Routes: Located in `routes/web.php` and `routes/api.php`

### Frontend (React/Inertia.js)
- Pages: Located in `resources/js/Pages/`
- Components: Located in `resources/js/Components/`
- Layouts: Located in `resources/js/Layouts/`
- Utilities: Located in `resources/js/lib/`

## Database Structure

### Key Tables
1. `organizations`
   - Stores organization information
   - Fields: id, name, slug, domain, settings, etc.

2. `users`
   - Stores user information
   - Fields: id, organization_id, role_id, name, email, etc.
   - Relations: belongsTo Organization, belongsTo Role, belongsTo Department

3. `departments`
   - Stores department information
   - Fields: id, organization_id, name, code, description, etc.
   - Relations: belongsTo Organization, hasMany Users, hasMany Shifts

4. `shifts`
   - Stores shift information
   - Fields: id, organization_id, user_id, department_id, title, description, etc.
   - Relations: belongsTo Organization, belongsTo User, belongsTo Department

5. `shift_applications`
   - Stores shift application information
   - Fields: id, shift_id, user_id, status, notes, etc.
   - Relations: belongsTo Shift, belongsTo User

## Authentication & Authorization

### Authentication Flow
1. Login: `/login` route handled by `Auth\AuthenticatedSessionController`
2. Registration: `/register` route handled by `Auth\RegisteredUserController`
3. Password Reset: `/forgot-password` and `/reset-password` routes

### Role-Based Access
- Roles: admin, employee
- Permissions managed through Spatie Permission package
- Role assignment during user creation

## Page Structure & Routes

### Main Pages

1. **Dashboard** (`/dashboard`)
   - Component: `resources/js/Pages/Dashboard.jsx`
   - Controller: `DashboardController@index`
   - Shows statistics and quick actions
   - Connected components:
     - Card
     - Button
     - Link

2. **Shifts Management**
   - List (`/shifts`)
     - Component: `resources/js/Pages/Shifts/Index.jsx`
     - Controller: `ShiftController@index`
   - Create (`/shifts/create`)
     - Component: `resources/js/Pages/Shifts/Create.jsx`
     - Controller: `ShiftController@create`
   - Edit (`/shifts/{id}/edit`)
     - Component: `resources/js/Pages/Shifts/Edit.jsx`
     - Controller: `ShiftController@edit`
   - Show (`/shifts/{id}`)
     - Component: `resources/js/Pages/Shifts/Show.jsx`
     - Controller: `ShiftController@show`

3. **Employee Management**
   - List (`/employees`)
     - Component: `resources/js/Pages/Employees/Index.jsx`
     - Controller: `EmployeeController@index`
   - Create (`/employees/create`)
     - Component: `resources/js/Pages/Employees/Create.jsx`
     - Controller: `EmployeeController@create`
   - Edit (`/employees/{id}/edit`)
     - Component: `resources/js/Pages/Employees/Edit.jsx`
     - Controller: `EmployeeController@edit`

4. **Department Management**
   - List (`/departments`)
     - Component: `resources/js/Pages/Departments/Index.jsx`
     - Controller: `DepartmentController@index`
   - Create (`/departments/create`)
     - Component: `resources/js/Pages/Departments/Create.jsx`
     - Controller: `DepartmentController@create`

## Components

### UI Components
Located in `resources/js/Components/ui/`

1. **DataTable**
   - Purpose: Reusable table component with sorting, filtering, and pagination
   - Used in: Shifts Index, Employees Index, Departments Index
   - Props:
     - columns: Table column definitions
     - data: Data to display
     - searchKey: Key for search functionality

2. **Card**
   - Purpose: Display content in card format
   - Used in: Dashboard, various forms
   - Components:
     - Card
     - CardHeader
     - CardTitle
     - CardContent
     - CardFooter

3. **Form Components**
   - Input: Text input fields
   - Select: Dropdown selection
   - Button: Action buttons
   - Badge: Status indicators

### Layout Components

1. **AuthenticatedLayout**
   - Purpose: Main layout for authenticated users
   - Features:
     - Navigation
     - User menu
     - Mobile responsiveness
   - Used in: All authenticated pages

## Common Issues & Solutions

1. **Message Port Closed Error**
   - Issue: "The message port closed before a response was received"
   - Solution:
     ```bash
     npm run build
     php artisan optimize:clear
     php artisan cache:clear
     php artisan view:clear
     ```

2. **Page Not Found Errors**
   - Issue: "Page not found: ./Pages/X/Y.jsx"
   - Solution:
     - Ensure the component file exists
     - Check the import path
     - Clear Laravel and Vite caches

3. **Route Not Found**
   - Issue: "Route [x] not defined"
   - Solution:
     - Check `routes/web.php` for route definition
     - Run `php artisan route:list` to verify routes
     - Clear route cache: `php artisan route:clear`

4. **Database Related Issues**
   - Solution:
     ```bash
     php artisan migrate:fresh --seed
     ```

## Development Workflow

1. **Starting the Development Environment**
   ```bash
   # Terminal 1
   php artisan serve

   # Terminal 2
   npm run dev
   ```

2. **Making Changes**
   - Backend changes: Update controllers/models
   - Frontend changes: Update React components
   - Database changes: Create/modify migrations

3. **Troubleshooting Steps**
   ```bash
   # Clear all caches
   php artisan optimize:clear
   
   # Rebuild frontend
   npm run build
   
   # Restart servers
   ```

## API Routes and Controllers

### API Endpoints (`routes/api.php`)

1. **Shifts API**
   - GET `/api/shifts`: List shifts
   - POST `/api/shifts`: Create shift
   - GET `/api/shifts/{id}`: Get shift details
   - PUT `/api/shifts/{id}`: Update shift
   - DELETE `/api/shifts/{id}`: Delete shift

2. **Employees API**
   - GET `/api/employees`: List employees
   - POST `/api/employees`: Create employee
   - GET `/api/employees/{id}`: Get employee details
   - PUT `/api/employees/{id}`: Update employee
   - DELETE `/api/employees/{id}`: Delete employee

3. **Departments API**
   - GET `/api/departments`: List departments
   - POST `/api/departments`: Create department
   - GET `/api/departments/{id}`: Get department details
   - PUT `/api/departments/{id}`: Update department
   - DELETE `/api/departments/{id}`: Delete department

## Security Considerations

1. **Authentication**
   - Uses Laravel Sanctum for API authentication
   - Session-based authentication for web routes
   - CSRF protection enabled

2. **Authorization**
   - Role-based access control
   - Policy-based authorization for resources
   - Organization-level data isolation

3. **Data Validation**
   - Request validation in controllers
   - Form validation on frontend
   - SQL injection protection

## Deployment Checklist

1. **Environment Setup**
   - Configure `.env` file
   - Set up database connections
   - Configure mail settings

2. **Build Process**
   ```bash
   composer install --optimize-autoloader --no-dev
   npm install
   npm run build
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. **Database Setup**
   ```bash
   php artisan migrate --force
   php artisan db:seed
   ```

## Maintenance and Updates

1. **Regular Maintenance**
   - Clear caches periodically
   - Monitor logs
   - Update dependencies

2. **Backup Strategy**
   - Database backups
   - File storage backups
   - Configuration backups

3. **Performance Optimization**
   - Database query optimization
   - Asset optimization
   - Cache implementation 