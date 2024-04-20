<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Positions;
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
        $positions = Positions::all();
        $votesPerPage = Vote::with('user', 'candidate')->paginate(10);
    
        return Inertia::render(
            'Moderator/ModeratorPages/Votes',
            [
                'votes' => $votes,
                'voters' => $voters,
                'positions' => $positions,
                'votesPerPage' => $votesPerPage
            ]
        );
    }
   
    public function createVote(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'election_id' => 'required|exists:elections,id',
            'candidate_ids' => 'required|array',
            'candidate_ids.*' => 'required|exists:candidates,id',
        ]);

        // Check if the authenticated user is a voter
        $user = auth()->user();
        if (!$user || $user->role !== 'voter') {
            return redirect()->back()->with('error', 'You are not authorized to vote');
        }

        // Check if the user has already voted in this election
        $existingVote = Vote::where('voter_id', $user->id)
            ->where('election_id', $validatedData['election_id'])
            ->exists();

        if ($existingVote) {
            return redirect()->back()->with('error', 'You have already voted in this election');
        }

        // Create a new vote for each selected candidate
        foreach ($validatedData['candidate_ids'] as $candidateId) {
            $vote = new Vote();
            $vote->voter_id = $user->id;
            $vote->election_id = $validatedData['election_id'];
            $vote->candidate_id = $candidateId;
            $vote->vote_timestamp = now();
            $vote->save();
        }

        return redirect()->back()->with('success', 'Successfully voted');
    }
}
