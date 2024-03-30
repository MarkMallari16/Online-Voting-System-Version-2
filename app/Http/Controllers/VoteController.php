<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\Partylist;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Vote;
use Inertia\Inertia;

class VoteController extends Controller
{

    public function index()
    {
        $votes = Vote::with('user', 'candidate')->get();
        $voters = User::where('role', 'voter')->get();


        return Inertia::render(
            'Moderator/ModeratorPages/Votes',
            [
                'votes' => $votes,
                'voters' => $voters,
            ]
        );
    }
   
    public function show($id)
    {
        $vote = Vote::findOrFail($id);
        return Inertia::render('Voter/CandidateCard', ['vote' => $vote]);
    }

    public function createVote(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'election_id' => 'required|exists:elections,id',
            'candidate_id' => 'required|exists:candidates,id',
        ]);

        // Create the new vote
        $vote = Vote::create([
            'voter_id' => auth()->user()->id,
            'election_id' => $validatedData['election_id'],
            'candidate_id' => $validatedData['candidate_id'],
        ]);

        // Redirect to the appropriate page
        return redirect()->back()->with('success', 'Vote successfully created');
    }
}
