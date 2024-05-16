<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Election extends Model
{
    use HasFactory,SoftDeletes;

    protected $guarded = ['id'];
    protected $fillable = ['title', 'start_date', 'end_date', 'status'];

    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
