<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;

class VoteController extends Controller
{
    public function vote(Request $request)
    {
        // Validate the request

        $vote = Vote::create([
            'voter_id' => auth()->user()->id,
            'election_id' => $request->input('election_id'),
            'candidate_id' => $request->input('candidate_id'),
        ]);

        return response()->json($vote, 201);
    }
}
