<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = ['title','start_date','end_date','status'];
    
   
}
