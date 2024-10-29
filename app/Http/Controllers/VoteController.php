<?php

namespace App\Http\Controllers;

use App\Models\Positions;
use App\Models\User;
use App\Models\Vote;
use App\Services\VoteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VoteController extends Controller
{
    protected $voteService;

    public function __construct(VoteService $voteService)
    {
        $this->voteService = $voteService;
    }

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
            'candidate_ids' => 'nullable|array',
            'candidate_ids.*' => 'nullable|exists:candidates,id'
        ]);

        $result = $this->voteService->createVote($validatedData);

        if (isset($result['error'])) {
            return redirect()->back()->with('error', $result['error']);
        }

        return redirect()->back()->with('success', $result['success']);
    }
}
?>