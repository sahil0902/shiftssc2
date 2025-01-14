<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTestDatabase extends Migration
{
    public function up()
    {
        // Create main database if it doesn't exist
        DB::statement('CREATE DATABASE IF NOT EXISTS shifts_sync_v2');
        
        // Create test database if it doesn't exist
        DB::statement('CREATE DATABASE IF NOT EXISTS shifts_sync_v2_testing');
    }

    public function down()
    {
        // Drop test database if exists
        DB::statement('DROP DATABASE IF EXISTS shifts_sync_v2_testing');
        
        // Note: We don't drop the main database in down() for safety
    }
}
