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
<<<<<<< HEAD
    {
        //admin
<<<<<<< HEAD

<<<<<<< HEAD
=======
<<<<<<< HEAD
    {
        //admin

=======
    {   
        //admin
        
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
        $usersPerPage = User::paginate(10);
=======
=======
        $totalAdmins = $this->countTotalAdmins();
        $totalModerators = $this->countTotalModerators();
        $totalStudents = $this->countTotalStudents();
        $totalVerifiedUsers = $this->countTotalVerifiedUsers();
        $totalUnverifiedUsers = $this->countTotalUnverifiedUsers();
>>>>>>> fee66585f2217ae06aa7f4b59b7e4a878df49d16
        $usersPerPage = $this->getUsersPerPage();
        $latestUsers = $this->getLatestUsers();
>>>>>>> a5d97759504b06652679829a51d708a4355848c1

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

        $voterHasVoted = false;
        $voterVoted = false;

        if ($user && $user->role === 'voter' && $election) {
            $voterId = $user->id;

            $voterVoted  = Vote::where('voter_id', $voterId)->where('election_id', $election->id)->exists();
            $voterHasVoted = $voterVoted;
        }

        $voters = User::where('role', 'voter')->get();

        $votersNotVoted = $voters->filter(function ($voter) use ($election) {
            return !$this->getHasVotedStatus($voter->id, $election->id);
        })->count();

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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
        if ($election && $voterId) {

            $castedVotes = Vote::where('election_id', $election->id)
                ->where('voter_id', $voterId)
                ->with([
                    'candidate:id,candidate_profile,first_name,middle_name,last_name,position_id,partylist_id',
                    'candidate.position:id,name',
                    'candidate.partylist:id,name'
                ])
                ->get();
        }
<<<<<<< HEAD
=======
=======
        $castedVotes = Vote::where('election_id', $election->id)
            ->where('voter_id', $voterId)
            ->with('candidate')
            ->get();
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933

        if ($election) {
            foreach ($candidates as $candidate) {
                $positionId = $candidate->position->id;
                $positionName = $candidate->position->name;
                $candidateName = $candidate->first_name . ' '  . $candidate->last_name;
                $candidateProfile = $candidate->candidate_profile;
                $voteCount = $candidate->votes()->count();

                $voteCounts[$candidate->id] = [
                    'position_id' => $positionId,
                    'position' => $positionName,
                    'candidate' => $candidateName,
                    'candidateProfile' => $candidateProfile,
                    'voteCount' => $voteCount,
                ];
            }
        }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
        $candidateWinners = [];
        $totalVotesPerPosition = [];

        $candidatesPerPosition = [];
        $totalCandidatesPerPositions =  [];
<<<<<<< HEAD
        $votersVotedCount = 0;
        $abstainCount = 0;
<<<<<<< HEAD
        $votersWhoVotedForWinners = 0;
=======

        $votersWhoVotedForWinners = 0;
        //display winner when election ends
        if ($election && $election->status === 'Active') {



=======

>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
=======

>>>>>>> a5d97759504b06652679829a51d708a4355848c1
        //display winner when election ends
        if ($election && $election->status === 'Active') {

            $votersVotedCount = Vote::where('election_id', $election->id)
                ->whereNotNull('candidate_id')
                ->distinct('voter_id')
                ->count();

<<<<<<< HEAD

<<<<<<< HEAD

=======
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
            $abstainCount = Vote::where('election_id', $election->id)
                ->whereNull('candidate_id')
                ->distinct('voter_id')
                ->count();

=======
            $votersWhoVotedForWinners = 0;
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
            foreach ($positions as $position) {

                $candidatesPerPosition = $candidates->where('position_id', $position->id);

                $winnerForPosition = null;

                $maxVotesPerPosition = 0;
                $totalVotesForPosition = 0;


                foreach ($candidatesPerPosition as $candidate) {
                    $voteCountsPerCandidates = $candidate->votes()->count();

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
            'totalAdmins' => $totalAdmins,
            'totalModerators' => $totalModerators,
            'totalStudents' => $totalStudents,
            'totalVerifiedUsers' => $totalVerifiedUsers,
            'totalUnverifiedUsers' => $totalUnverifiedUsers,
            'latestUsers' => $latestUsers,
            'partylist_list' => $partylist,
            'position_list' => $positions,
            'candidates' => $candidates,
            'candidatesAll' => $candidatesAll,
            'election' => $election,
            'voters' => $voters,
            'votersVotedCount' => $votersVotedCount,
            'abstainCount' => $abstainCount,
            'voteCounts' => $voteCounts,
            'votersNotVoted' => $votersNotVoted,
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
    private function getLatestUsers()
    {
        return User::whereNotNull('email_verified_at')->orderByDesc('created_at')->take(5)->get();
    }
    private function countTotalUsersByRole($role)
    {
        return User::where('role', $role)->count();
    }
    private function countTotalAdmins()
    {
        return $this->countTotalUsersByRole('admin');
    }
    private function countTotalModerators()
    {
        return $this->countTotalUsersByRole('moderator');
    }
    private function countTotalStudents()
    {
        return $this->countTotalUsersByRole('voter');
    }
    private function countTotalVerifiedUsers()
    {
        return User::whereNotNull('email_verified_at')->count();
    }
    private function countTotalUnverifiedUsers()
    {
        return User::whereNull('email_verified_at')->count();
    }
    private function getUsersPerPage()
    {
        return User::paginate(10);
    }
    private function countPartylists()
    {
        return Partylist::count();
    }
    private function countPositions()
    {
        return Positions::count();
    }
    private function getLatestElection()
    {
        return Election::latest('start_date')->first();
    }
}
