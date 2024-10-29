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

        $result = $this->voteService->createVote($validatedData);

        if (isset($result['error'])) {
            return redirect()->back()->with('error', $result['error']);
        }

        return redirect()->back()->with('success', $result['success']);
    }
}
?>