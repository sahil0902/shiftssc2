# ShiftsSync v2 Setup Commands

## PHP Setup Commands
```bash
# Install PHP dependencies
composer install

# Create and setup environment
cp .env.example .env
php artisan key:generate

# Database commands
php artisan migrate  # Fresh database setup
php artisan db:seed  # Seed the database
php artisan migrate:fresh --seed  # Combine fresh migration and seeding



# Testing commands
php artisan test  # Run all tests
php artisan test --filter=AuthTest  # Run specific test
php artisan test --stop-on-failure  # Stop on first failure
```

## Node.js Setup Commands
```bash
# Install all Node.js dependencies
npm install

# Install Vite and React
npm install @vitejs/plugin-react
npm install react react-dom @types/react @types/react-dom

# Install Tailwind CSS and PostCSS
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/forms
npm install tailwindcss-animate tailwind-merge class-variance-authority clsx

# Install Radix UI Components
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio
npm install @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible
npm install @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-hover-card @radix-ui/react-icons @radix-ui/react-label
npm install @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover
npm install @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area
npm install @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider
npm install @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs
npm install @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group
npm install @radix-ui/react-tooltip

# Install Form Libraries
npm install react-hook-form @hookform/resolvers yup zod formik

# Install Date Libraries
npm install date-fns react-datepicker react-day-picker

# Install Data Table and Charts
npm install @tanstack/react-table @tanstack/react-query recharts

# Install UI Enhancement Libraries
npm install sonner framer-motion lucide-react next-themes
npm install embla-carousel-react react-resizable-panels vaul

# Install TypeScript Development Tools
npm install -D typescript @types/react @types/react-dom
```

## Development Commands
```bash
# Start Vite development server
npm run dev

# Start Laravel development server
php artisan serve

# Build for production
npm run build
```

## Database Reset Commands
```bash
# Reset main database
php artisan migrate:fresh --seed

# Clear cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Reset test database
php artisan migrate:fresh --seed --env=testing
```

## Testing Commands
```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit

# Run with coverage report
php artisan test --coverage

# Run parallel testing
php artisan test --parallel
``` 