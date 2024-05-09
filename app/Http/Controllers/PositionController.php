<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Positions;
use Illuminate\Http\RedirectResponse;
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
    public function store(Request $request): RedirectResponse
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => ['required', Rule::unique('positions')->ignore($request->id)],
        ]);

        $position = Positions::create([
            'name' => $validatedData['name'],
        ]);

        return redirect()->back();
    }
    public function update(Request $request, $id): RedirectResponse
    {
        $position = Positions::findOrFail($id);

        $request->validate([
            'name' => ['required', Rule::unique('positions')->ignore($position->id)],

        ]);

        $position->update($request->all());

        return redirect()->back()
            ->with('success', 'Position updated successfully.');
    }
    public function destroy($id): RedirectResponse
    {
        $position = Positions::findOrFail($id);
        $position->delete();

        return redirect()->back()
            ->with('success', 'Position deleted successfully.');
    }
}
