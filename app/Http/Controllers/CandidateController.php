<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Partylist;
use App\Models\Positions;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CandidateController extends Controller
{

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
        $voterId = $user->id;
        //get the user id 
        $userId = Auth::id();

        $voterHasVoted = false;
        $voterVoted = false;

        if ($user && $user->role === 'voter') {
            $voterId = $user->id;
            $voterVoted  = Vote::where('voter_id', $userId)->where('election_id',$election->id)->exists();
            $voterHasVoted = $voterVoted;
        }


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
            'voterHasVoted' => $voterHasVoted
        ]);
    }
    public function getHasVotedStatus($userId, $electionId)
    {
        // Check if the user has voted in the specified election
        return Vote::where('voter_id', $userId)
            ->where('election_id', $electionId)
            ->exists();
    }

    public function index()
    {
        // Retrieve all candidates
        $positions = Positions::all();
        $partylist = Partylist::all();
        $candidate = Candidate::all();
        $candidatesPerPage = Candidate::paginate(10);

        return Inertia::render('Moderator/ModeratorPages/Candidate', [
            'partylist_list' => $partylist,
            'position_list' => $positions,
            'candidates' => $candidate,
            'candidatesPerPage' => $candidatesPerPage
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'candidate_profile' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('candidate_profile')) {
            $candidateProfileName = time() . '.' . $request->file('candidate_profile')->getClientOriginalExtension();

            // Move the file to the public/candidate_profile_photos directory
            $request->file('candidate_profile')->move(public_path('candidate_profile_photos'), $candidateProfileName);

            // Return the path relative to the public directory
            return 'candidate_profile_photos/' . $candidateProfileName;
        }

        // If no file is uploaded, return null
        return null;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string',
            'middle_name' => 'nullable|string',
            'last_name' => 'required|string',
            'manifesto' => 'required|string',
            'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'partylist_id' => 'required|exists:partylists,id',
            'position_id' => 'required|exists:positions,id'
        ]);

        $middleName = $validatedData['middle_name'] ?? null;
        $candidateImagePath = null;

        if ($request->hasFile('candidate_profile')) {
            $candidateImagePath = $this->uploadImage($request);
        }

        Candidate::create([
            'first_name' => $validatedData['first_name'],
            'middle_name' => $validatedData['middle_name'],
            'last_name' => $validatedData['last_name'],
            'manifesto' => $validatedData['manifesto'],
            'candidate_profile' => $candidateImagePath,
            'partylist_id' => $validatedData['partylist_id'],
            'position_id' => $validatedData['position_id']
        ]);

        return redirect()->back()->with('success', 'Candidate added successfully');
    }

    public function update(Request $request, $id)
    {
        $candidate = Candidate::findOrFail($id);

        $validatedData = $request->validate([
            'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'first_name' => 'required|string',
            'middle_name' => 'nullable|string',
            'last_name' => 'required|string',
            'manifesto' => 'required|string',
            'partylist_id' => 'required|exists:partylists,id',
            'position_id' => 'required|exists:positions,id'
        ]);

        $middleName = $validatedData['middle_name'] ?? null;

        $candidateImagePath = $candidate->candidate_profile;

        if ($request->hasFile('candidate_profile')) {
            // If a new profile image is uploaded, delete the old one
            if ($candidate->candidate_profile) {
                // Delete the old profile image file
                unlink(public_path($candidate->candidate_profile));
            }
            // Upload and save the new profile image
            $candidateImagePath = $this->uploadImage($request);
        }

        // Update candidate data
        $candidate->update([
            'candidate_profile' => $candidateImagePath,
            'first_name' => $validatedData['first_name'],
            'middle_name' => $validatedData['middle_name'],
            'last_name' => $validatedData['last_name'],
            'manifesto' => $validatedData['manifesto'],
            'partylist_id' => $validatedData['partylist_id'],
            'position_id' => $validatedData['position_id']
        ]);

        // Redirect back with success message
        return redirect()->back()->with('success', 'Candidate updated successfully');
    }

    public function destroy($id)
    {
        try {
            // Delete the candidate
            $candidate = Candidate::findOrFail($id);
            $candidate->delete();

            // Redirect back with success message
            return redirect()->back()->with('success', 'Candidate successfully deleted');
        } catch (\Exception $e) {
            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to delete candidate');
        }
    }
}
