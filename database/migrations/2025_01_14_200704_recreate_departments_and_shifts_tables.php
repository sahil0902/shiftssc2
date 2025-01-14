<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop existing tables in reverse order of dependencies
        Schema::dropIfExists('shifts');
        Schema::dropIfExists('users');
        Schema::dropIfExists('departments');

        // Create departments table first
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->boolean('allows_casual_shifts')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        // Recreate users table with department_id
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->foreignId('department_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('role', ['admin', 'manager', 'employee'])->default('employee');
            $table->rememberToken();
            $table->timestamps();
        });

        // Create shifts table last
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->onDelete('cascade');
            $table->foreignId('department_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('required_employees')->default(1);
            $table->decimal('hourly_rate', 8, 2)->nullable(false)->default('0.00');
            $table->decimal('total_hours', 8, 2)->default(0);
            $table->decimal('total_wage', 10, 2)->default(0);
            $table->enum('status', ['open', 'filled', 'cancelled', 'completed'])->default('open');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts');
        Schema::dropIfExists('users');
        Schema::dropIfExists('departments');
    }
};
