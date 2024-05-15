<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partylist extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'partylist_logo'
    ];

    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }
}
