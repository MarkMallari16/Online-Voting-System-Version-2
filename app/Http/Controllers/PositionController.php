<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Positions;
use Illuminate\Validation\Rule;

class PositionController extends Controller
{
    public function index()
    {
        $positions = Positions::all();

        return Inertia::render('Positions/Index', [
            'positions' => $positions,
        ]);
    }
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|unique:positions',
        ]);

        try {
            // Create the position
            $position = Positions::create([
                'name' => $request->name,
            ]);

            // Return a JSON response with the created position and a success message
            return response()->json([
                'position' => $position,
                'message' => 'Position created successfully'
            ], 201);
        } catch (\Exception $e) {
            // Return an error response if an exception occurs
            return response()->json(['message' => 'Failed to create position'], 500);
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
