<?php

namespace Database\Factories;

use App\Models\Candidate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Candidate>
 */
class CandidateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Candidate::class;
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName,
            'middle_name' => $this->faker->optional()->lastName,
            'last_name' => $this->faker->lastName,
            'partylist_id' => \App\Models\Partylist::inRandomOrder()->first()->id,
            'position_id' => \App\Models\Positions::inRandomOrder()->first()->id,
            'manifesto' => $this->faker->paragraph,
            'candidate_profile' => $this->faker->sentence,
            // Add more fields as needed
        ];
    }
}
