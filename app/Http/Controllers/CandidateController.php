<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    public function index()
    {
        // Retrieve all candidates
        $candidates = Candidate::all();

        // Return the candidates data as JSON
        return response()->json([
            'candidates' => $candidates,
        ]);
    }
    public function store(Request $request)
    {
        // Validate the incoming request data
        try {
            $validatedData = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'partylist_id' => 'required|exists:partylists,id',
                'position_id' => 'required|exists:positions,id',
                'position' => 'required|string',
                'manifesto' => 'required|string',
                'candidate_profile' => 'nullable|string',
            ]);

            // Create a new candidate instance
            $candidate = Candidate::create([
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'partylist_id' => $validatedData['partylist_id'],
                'position_id' => $validatedData['position_id'],
                'position' => $validatedData['position'],
                'manifesto' => $validatedData['manifesto'],
                'candidate_profile' => $validatedData['candidate_profile'],
            ]);

            // Return a JSON response indicating success
            return redirect()->back()->with('success', 'Candidate created successfully');
        } catch (\Exception $e) {

            return redirect()->back()->with('error', 'Failed to create position');
        }
    }
    public function update(Request $request, Candidate $candidate)
    {
        // Validate the incoming request data
        try {
            $validatedData = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'partylist_id' => 'required|exists:partylists,id',
                'position_id' => 'required|exists:positions,id',
                'position' => 'required|string',
                'manifesto' => 'required|string',
                'candidate_profile' => 'nullable|string',
            ]);

            // Update the candidate
            $candidate->update([
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'partylist_id' => $validatedData['partylist_id'],
                'position_id' => $validatedData['position_id'],
                'position' => $validatedData['position'],
                'manifesto' => $validatedData['manifesto'],
                'candidate_profile' => $validatedData['candidate_profile'],
            ]);

            // Redirect back with success message
            return redirect()->back()->with('success', 'Candidate updated successfully');
        } catch (\Exception $e) {
            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to update candidate');
        }
    }

    public function destroy(Candidate $candidate)
    {
        try {
            // Delete the candidate
            $candidate->delete();

            // Redirect back with success message
            return redirect()->back()->with('success', 'Candidate deleted successfully');
        } catch (\Exception $e) {
            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to delete candidate');
        }
    }
}
