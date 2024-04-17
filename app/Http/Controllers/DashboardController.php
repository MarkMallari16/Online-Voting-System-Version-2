<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidate;
use App\Models\Partylist;
use App\Models\Positions;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function getHasVotedStatus($userId, $electionId)
    {
        // Check if the user has voted in the specified election
        return Vote::where('voter_id', $userId)
            ->where('election_id', $electionId)
            ->exists();
    }
    function dashboard()
    {
        $positions = Positions::all();
        $partylist = Partylist::all();
        $candidates = Candidate::all();
        $candidatesAll = Candidate::with('position', 'partylist')->get();

        // Retrieve the latest election, whether active or inactive
        $election = Election::where('status', 'Active')
            ->orWhere('status', 'Inactive')
            ->latest('start_date')
            ->first();

        // get the authenticated user
        $user = Auth::user();
        //get the user id 
        // $voterId = $user->id;
        //get the user id 
        $userId = Auth::id();

        $voterHasVoted = false;
        $voterVoted = false;

        if ($user && $user->role === 'voter') {
            $voterId = $user->id;
            $voterVoted  = Vote::where('voter_id', $userId)->where('election_id', $election->id)->exists();
            $voterHasVoted = $voterVoted;
        }

        $userName = Auth::user()->name;

        $voters = User::where('role', 'voter')->get();

        $votedVotersCount = Vote::distinct('voter_id')->count();

        $voters->transform(function ($voter) use ($election) {
            $voterId = $voter->id;
            $voter->hasVoted = $this->getHasVotedStatus($voterId, $election->id);
            return $voter;
        });

        //for casted votes
        $castedVotes = Vote::where('election_id', $election->id)
            ->where('voter_id', $voterId)
            ->with('candidate')
            ->get();

        //for votes counts
        $voteCounts = [];

        foreach ($candidates as $candidate) {
            $positionId = $candidate->position->id;
            $positionName = $candidate->position->name;
            $candidateName = $candidate->first_name . ' '  . $candidate->last_name;
            $voteCount = Vote::where('candidate_id', $candidate->id)->count();

            $voteCounts[$candidate->id] = [
                'position_id' => $positionId,
                'position' => $positionName,
                'candidate' => $candidateName,
                'voteCount' => $voteCount,
            ];
        }

        return Inertia::render('Dashboard', [
            'partylist_list' => $partylist,
            'position_list' => $positions,
            'candidates' => $candidates,
            'candidatesAll' => $candidatesAll,
            'election' => $election,
            'voters' => $voters,
            'votersVotedCount' => $votedVotersCount,
            'voteCounts' => $voteCounts,
            'castedVotes' => $castedVotes,
            'voterVoted' => $voterVoted,
            'voterHasVoted' => $voterHasVoted,
            'name' =>  $userName,
        ]);
    }
}
