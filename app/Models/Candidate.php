<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;
    protected $fillable = ['first_name', 'last_name', 'middle_name', 'position', 'partylist', 'manifesto', 'candidate_profile'];

    public function votes()
    {
        return $this->hasMany(Vote::class, 'candidate_id');
    }

    public function candidatePosition()
    {
        return $this->belongsTo(Positions::class, 'position');
    }
}
