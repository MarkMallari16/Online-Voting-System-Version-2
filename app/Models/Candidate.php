<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Positions;
class Candidate extends Model
{
    use HasFactory;
    protected $fillable = ['first_name', 'last_name', 'position', 'manifesto', 'candidate_profile'];

    public function position()
    {
        return $this->belongsTo(Positions::class);
    }

    public function partylist()
    {
        return $this->belongsTo(Partylist::class);
    }
}
