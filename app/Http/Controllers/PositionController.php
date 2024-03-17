<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Positions;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10); // Get the perPage value from the request, default to 10 if not provided
        $positions = Positions::paginate($perPage); // Paginate positions using the perPage value

        return response()->json($positions); // Return just the items (positions) without pagination metadata
    }
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => ['required', Rule::unique('positions')->ignore($request->id)],
        ]);

        try {
            // Create the position
            $position = Positions::create([
                'name' => $request->name,
            ]);

           
            return redirect()->back()->with('success', 'Positions created successfully');
        } catch (\Exception $e) {
            
            return redirect::back()->with('error', 'Failed to create position');
        }
    }
    public function update(Request $request, Positions $position)
    {
        $request->validate([
            'name' => ['required', Rule::unique('positions')->ignore($position)],
            // Add any other validation rules here
        ]);

        $position->update($request->all());

        return redirect()->route('positions.index')
            ->with('success', 'Position updated successfully.');
    }
    public function destroy(Positions $position)
    {
        $position->delete();

        return redirect()->route('positions.index')
            ->with('success', 'Position deleted successfully.');
    }
}
