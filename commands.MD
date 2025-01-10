# Create the shifts table migration
php artisan make:migration create_shifts_table

# Run the migrations to create tables in the database
php artisan migrate

# Create the ShiftModel factory
php artisan make:factory ShiftModelFactory --model=ShiftModel

# Create the ShiftSeeder
php artisan make:seeder ShiftSeeder

# Create the ShiftModel
php artisan make:model ShiftModel

# Seed the database with the ShiftSeeder
php artisan db:seed

# Create the ShiftController
php artisan make:controller ShiftController --resource