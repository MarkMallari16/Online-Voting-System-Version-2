<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoteRequest;
use App\Mail\VoteConfirmation;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\Positions;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
            ->paginate(10);

        $positions = Positions::all();

        $votesPerPage = Vote::select('voter_id', 'election_id', 'vote_timestamp')
            ->with('user:id,name,email,email_verified_at', 'election:id,title')
            ->groupBy('voter_id', 'election_id', 'vote_timestamp')
            ->orderByDesc('vote_timestamp')
            ->paginate(10);

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
            'candidate_ids' => 'nullable|array',
            'candidate_ids.*' => 'nullable|exists:candidates,id'
        ]);


        $user = Auth::user();

        if (!$user || $user->role !== 'voter') {
            return redirect()->back()->with('error', 'You are not authorized to vote');
        }

        $election = Election::find($validatedData['election_id']);

        $existingVote = Vote::where('voter_id', $user->id)
            ->where('election_id', $validatedData['election_id'])
            ->exists();

        if ($existingVote) {
            return redirect()->back()->with('error', 'You have already voted in this election');
        }

        if (empty($validatedData['candidate_ids'])) {
            $vote = new Vote();
            $vote->voter_id = $user->id;
            $vote->election_id = $validatedData['election_id'];
            $vote->vote_timestamp = now();
            $vote->isAbstained = true;
            $vote->save();
            
            Mail::to($user->email)->send(new VoteConfirmation($user, $election));

            return redirect()->back()->with('success', 'Successfully abstained from voting');
        }

        // Create a new vote for each selected candidate
        foreach ($validatedData['candidate_ids'] as $candidateId) {

            $vote = new Vote();
            $vote->voter_id = $user->id;
            $vote->election_id = $validatedData['election_id'];

            $vote->vote_timestamp = now();

            if (empty($candidateId)) {
                $vote->isAbstained = true;
            } else {

                $vote->candidate_id = $candidateId;
            }

            $vote->save();
        }
        Mail::to($user->email)->send(new VoteConfirmation($user, $election));

        return redirect()->back()->with('success', 'Successfully voted');
    }
}
