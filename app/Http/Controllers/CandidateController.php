<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\Partylist;
use App\Models\Positions;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class CandidateController extends Controller
{

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
            'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('candidate_profile')) {
            $candidateProfileName = time() . '.' . $request->file('candidate_profile')->hashName();

            // Move the file to the public/candidate_profile_photos directory
            $path = $request->file('candidate_profile')->storeAs('candidate_profile_photos', $candidateProfileName, 'public');

            // Return the path relative to the public directory
            return $path;
        }

        // If no file is uploaded, return null
        return null;
    }

    public function store(Request $request)
    {
        $election = Election::latest()->first();

        if (!$election) {
            return redirect()->back();
        }

        $validatedData = $request->validate([
            'first_name' => 'required|alpha',
            'middle_name' => 'nullable|string',
            'last_name' => 'required|alpha',
            'manifesto' => 'required|string',
            'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'partylist_id' => [
                'required',
                'exists:partylists,id',

            ],
            'position_id' => [
                'required',
                'exists:positions,id',
                Rule::unique('candidates')->where(function ($query) use ($request) {
                    return $query->where('position_id', $request->position_id)
                        ->where('partylist_id', $request->partylist_id);
                })->ignore($request->candidate_id)
            ],
        ], [
            'partylist_id.required' => 'The partylist field is required',
            'position_id.required' =>  'The position field is required',
            'position_id.unique' => 'An existing candidate has already been registered for this position. Consider updating the existing candidate instead.',
        ]);


        $middleName = $validatedData['middle_name'] ?? null;
        $candidateImagePath = 'images/default_profile.png';

        if ($request->hasFile('candidate_profile')) {
            $candidateImagePath = $this->uploadImage($request);
        }

        Candidate::create([
            'first_name' => $validatedData['first_name'],
            'middle_name' => $middleName,
            'last_name' => $validatedData['last_name'],
            'manifesto' => $validatedData['manifesto'],
            'candidate_profile' => $candidateImagePath,
            'partylist_id' => $validatedData['partylist_id'],
            'position_id' => $validatedData['position_id'],
            'election_id' => $election->id
        ]);


        return redirect()->back()->with('success', 'Candidate added successfully');
    }

    public function update(Request $request, $id)
    {
        $election = Election::latest()->first();
        $candidate = Candidate::findOrFail($id);

        $validatedData = $request->validate([
            'first_name' => 'required|string',
            'middle_name' => 'nullable|string',
            'last_name' => 'required|alpha',
            'manifesto' => 'required|string',
            // 'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'partylist_id' => 'required|exists:partylists,id',
            'position_id' => 'required|exists:positions,id',

        ]);

        $middleName = $validatedData['middle_name'] ?? null;
        $candidateImagePath = $candidate->candidate_profile;

        if ($request->hasFile('candidate_profile')) {

            if ($request->hasFile('candidate_profile')) {
                $candidateImagePath = $this->uploadImage($request);
            }
        } else if ($candidate->candidate_profile) {
            $candidateImagePath = $candidate->candidate_profile;
        }

        $candidate->first_name = $validatedData['first_name'];
        $candidate->middle_name = $middleName;
        $candidate->last_name = $validatedData['last_name'];
        $candidate->manifesto = $validatedData['manifesto'];
        $candidate->partylist_id = $validatedData['partylist_id'];
        $candidate->position_id = $validatedData['position_id'];
        $candidate->candidate_profile = $candidateImagePath;
        $candidate->election_id = $election->id;

        $candidate->save();
        return redirect()->back()->with('success', 'Candidate deleted successfully');
    }

    public function destroy(Candidate $candidate)
    {
        $associatedVotes = DB::table('votes')->where('candidate_id', $candidate->id)->exists();

        if ($associatedVotes) {
            return redirect()->back()->with('error', 'Cannot delete candidate. There are associated votes.');
        }
        $candidate->delete();


        return redirect()->back()->with('success', 'Candidate deleted successfully');
    }
}
