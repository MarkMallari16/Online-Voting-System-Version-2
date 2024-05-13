<?php

namespace App\Http\Controllers;


use App\Models\Candidate;
use App\Models\Partylist;
use App\Models\Positions;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

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
        //admin

        $usersPerPage = $this->getUsersPerPage();

        //moderator
        $positions = Positions::all();
        $partylist = Partylist::all();
        $candidates = Candidate::all();
        $candidatesAll = Candidate::with('position', 'partylist')->get();

        $numberOfPartylists = $this->countPartylists();
        $numberOfPositions = $this->countPositions();

        // Retrieve the latest election, whether active or inactive
        $election = $this->getLatestElection();

        // get the authenticated user
        $user = Auth::user();
        //get the user id 
        $voterId = $user->id;
        //get the user id 
        // $userId = Auth::id();

        $voterHasVoted = false;
        $voterVoted = false;

        if ($user && $user->role === 'voter' && $election) {
            $voterId = $user->id;

            $voterVoted  = Vote::where('voter_id', $voterId)->where('election_id', $election->id)->exists();
            $voterHasVoted = $voterVoted;
        }

        $voters = User::where('role', 'voter')->get();



        $voters->transform(function ($voter) use ($election) {
            $voterId = $voter->id;
            $voter->hasVoted = $election ? $this->getHasVotedStatus($voterId, $election->id) : false;
            return $voter;
        });
        $latestVotedUsers = User::join('votes', 'users.id', '=', 'votes.voter_id')
            ->select('users.*', 'votes.vote_timestamp')
            ->whereNotNull('votes.voter_id')
            ->orderBy('votes.vote_timestamp', 'desc')
            ->distinct()
            ->limit(2)
            ->get();



        $voteCounts = [];

        $castedVotes = null;

        if ($election && $voterId) {

            $castedVotes = Vote::where('election_id', $election->id)
                ->where('voter_id', $voterId)
                ->with('candidate')
                ->get();
        }

        if ($election) {
            foreach ($candidates as $candidate) {
                $positionId = $candidate->position->id;
                $positionName = $candidate->position->name;
                $candidateName = $candidate->first_name . ' '  . $candidate->last_name;

                $voteCount = $candidate->votes()->count();

                $voteCounts[$candidate->id] = [
                    'position_id' => $positionId,
                    'position' => $positionName,
                    'candidate' => $candidateName,
                    'voteCount' => $voteCount,
                ];
            }
        }
        $candidateWinners = [];
        $totalVotesPerPosition = [];
        $candidatesVotes = [];
        $candidatesPerPosition = [];
        $totalCandidatesPerPositions =  [];
        $votersVotedCount = 0;
        $abstainCount = 0;
        $votersWhoVotedForWinners = 0;
        //display winner when election ends
        if ($election && $election->status === 'Active') {

            $votersVotedCount = Vote::where('election_id', $election->id)
                ->whereNotNull('candidate_id')
                ->distinct('voter_id')
                ->count();

            $abstainCount = Vote::where('election_id', $election->id)
                ->whereNull('candidate_id')
                ->distinct('voter_id')
                ->count();

            foreach ($positions as $position) {
                //getting the position id 
                $candidatesPerPosition = $candidates->where('position_id', $position->id);

                //set winner for position by default to null
                $winnerForPosition = null;

                $maxVotesPerPosition = 0;
                $totalVotesForPosition = 0;

                //getting the candidate
                foreach ($candidatesPerPosition as $candidate) {
                    $voteCountsPerCandidates = $candidate->votes()->count();

                    //get the total votes per position
                    if ($voteCountsPerCandidates > $maxVotesPerPosition) {
                        $maxVotesPerPosition = $voteCountsPerCandidates;
                        $winnerForPosition = $candidate;
                    }

                    $totalVotesForPosition += $voteCountsPerCandidates;
                    $totalCandidatesPerPositions[$position->name][$candidate->last_name . ', ' . $candidate->first_name] = $voteCountsPerCandidates;
                }

                if ($winnerForPosition) {
                    $candidateWinners[$position->name] = [
                        'candidate_profile' => $winnerForPosition->candidate_profile,
                        'candidate_full_name' => $winnerForPosition->first_name . ' ' . $winnerForPosition->last_name,
                        'partylist_name' => $winnerForPosition->partylist->name,
                        'totalVotes' => $maxVotesPerPosition
                    ];
                }
                $totalVotesPerPosition[$position->name] = $totalVotesForPosition;
            }
        }



        return Inertia::render('Dashboard', [
            'usersPerPage' => $usersPerPage,
            'partylist_list' => $partylist,
            'position_list' => $positions,
            'candidates' => $candidates,
            'candidatesAll' => $candidatesAll,
            'election' => $election,
            'voters' => $voters,
            'votersVotedCount' => $votersVotedCount,
            'abstainCount' => $abstainCount,

            'voteCounts' => $voteCounts,
            'numberOfPartylists' => $numberOfPartylists,
            'numberOfPositions' => $numberOfPositions,
            'castedVotes' => $castedVotes,
            'voterVoted' => $voterVoted,
            'latestVotedUsers' => $latestVotedUsers,
            'voterHasVoted' => $voterHasVoted,
            'candidateWinners' => $candidateWinners,
            'totalCandidatesPerPositions' => $totalCandidatesPerPositions,
            'totalVotesPerPosition' => $totalVotesPerPosition,

        ]);
    }

    private function getUsersPerPage()
    {
        return User::paginate(10);
    }
    private function countPartylists()
    {
        return Partylist::all()->count();
    }
    private function countPositions()
    {
        return Positions::all()->count();
    }
    private function getLatestElection()
    {
        return Election::where('status', 'Active')
            ->orWhere('status', 'Inactive')
            ->latest('start_date')
            ->first();
    }
}
