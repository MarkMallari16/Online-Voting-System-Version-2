<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'manifesto',
        'candidate_profile',
        'position_id',
        'partylist_id'
    ];

    public function votes()
    {
        return $this->hasMany(Vote::class, 'candidate_id');
    }

    public function position()
    {
        return $this->belongsTo(Positions::class);
    }

    // Define the relationship with Partylist
    public function partylist()
    {
        return $this->belongsTo(Partylist::class);
    }
}
