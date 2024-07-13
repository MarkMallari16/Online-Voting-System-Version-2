<?php 
namespace App\Services;

use App\Models\AuditLog;
use App\Models\Election;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

class VoteService
{
    public function createVote($validatedData)
    {
        $user = Auth::user();

        if (!$user || $user->role !== 'voter') {
            return ['error' => 'You are not authorized to vote'];
        }

        $election = Election::latest()->first();

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

            return ['success' => 'Successfully abstained from voting'];
        }

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

        return ['success' => 'Successfully voted'];
    }
}

?>