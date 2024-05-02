<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Positions;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class PositionController extends Controller
{
    public function index()
    {
        $positions = Positions::all();
        $positionsPerPage = Positions::paginate(10);

        return Inertia::render('Moderator/ModeratorPages/Positions', [
            'positions' => $positions,
            'positionsPerPage' => $positionsPerPage
        ]);
    }
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => ['required', Rule::unique('positions')->ignore($request->id)],
        ]);

        $position = Positions::create([
            'name' => $validatedData['name'],
        ]);

        return redirect()->back()->with('success', 'position created successfully');
    }
    public function update(Request $request, $id)
    {
        $position = Positions::findOrFail($id);

        $request->validate([
            'name' => ['required', Rule::unique('positions')->ignore($position->id)],

        ]);

        $position->update($request->all());

        return redirect()->back()
            ->with('success', 'Position updated successfully.');
    }
    public function destroy($id)
    {
        try {
            $position = Positions::findOrFail($id);
            $position->delete();
            return redirect()->back()->with('success', 'Position successfully deleted');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete position: ' . $e->getMessage());
        }
    }
}
