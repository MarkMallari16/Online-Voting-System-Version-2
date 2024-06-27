<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Election;
use App\Models\Positions;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VoteController extends Controller
{
    public function index()
    {
        $votes = Vote::select('voter_id', 'election_id', 'vote_timestamp')
            ->with('user:id,name,email,email_verified_at', 'election:id,title')
            ->groupBy('voter_id', 'election_id', 'vote_timestamp')
            ->orderByDesc('vote_timestamp')
            ->get();

        $voters = User::where('role', 'voter')
            ->whereNotNull('email_verified_at')
            ->paginate(15);

        $positions = Positions::all();

        $votesPerPage = Vote::select('voter_id', 'election_id', 'vote_timestamp')
            ->with('user:id,name,email,email_verified_at', 'election:id,title')
            ->groupBy('voter_id', 'election_id', 'vote_timestamp')
            ->orderByDesc('vote_timestamp')
            ->paginate(15);

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

        $validatedData = $request->validate([
            'election_id' => 'required|exists:elections,id',
<<<<<<< HEAD
            'candidate_ids' => 'nullable|array',
=======
<<<<<<< HEAD
            'candidate_ids' => 'nullable|array',
            'candidate_ids.*' => 'required|exists:candidates,id'
=======
            'candidate_ids' => 'required|array',
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
            'candidate_ids.*' => 'nullable|exists:candidates,id'
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
        ]);


        $user = Auth::user();

        if (!$user || $user->role !== 'voter') {
            return redirect()->back()->with('error', 'You are not authorized to vote');
        }

        $election  = Election::latest()->first();

        $existingVote = Vote::where('voter_id', $user->id)
            ->where('election_id', $validatedData['election_id'])
            ->exists();

    
        if (empty($validatedData['candidate_ids'])) {
            $vote = new Vote();
            $vote->voter_id = $user->id;
            $vote->election_id = $validatedData['election_id'];
            $vote->vote_timestamp = now();
            $vote->isAbstained = true;
            $vote->save();

            // Mail::to($user->email)->send(new VoteConfirmation($user, $election));

            return redirect()->back()->with('success', 'Successfully abstained from voting');
        }

        // Create a new vote for each selected candidate
        foreach ($validatedData['candidate_ids'] as $candidateId) {

            $vote = new Vote();
            $vote->voter_id = $user->id;
            $vote->election_id = $validatedData['election_id'];

            $vote->vote_timestamp = now();

            $vote->candidate_id = $candidateId;

            $vote->save();
        }

        AuditLog::create([
            'user_id' => $user->id,
            'action' => 'Successful',
            'details' => 'Successfully voted with election name: ' . $election->title
        ]);
        // Mail::to($user->email)->send(new VoteConfirmation($user, $election));

        return redirect()->back()->with('success', 'Successfully voted');
    }
}
