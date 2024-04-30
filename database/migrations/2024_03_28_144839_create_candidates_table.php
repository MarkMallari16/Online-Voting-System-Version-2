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
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->text('manifesto');
            $table->string('candidate_profile')->nullable()->default('candidate_profile_photos/default_candidate_profile.png');
            $table->unsignedBigInteger('position_id')->nullable();
            $table->unsignedBigInteger('partylist_id')->nullable();
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('position_id')->references('id')->on('positions')->onDelete('set null');
            $table->foreign('partylist_id')->references('id')->on('partylists')->onDelete('set null');
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
