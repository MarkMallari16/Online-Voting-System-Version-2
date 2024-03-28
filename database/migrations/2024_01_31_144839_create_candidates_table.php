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
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->string('partylist');
         
            $table->unsignedBigInteger('partylist_id'); 
            $table->unsignedBigInteger('position_id');

            $table->text('manifesto');
            $table->string('candidate_profile')->default('profile_photos/default_profile.png');
            $table->timestamps();

            $table->foreignId('partylist_id')->constrained('partylists'); 
            $table->foreignId('position_id')->constrained('positions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
