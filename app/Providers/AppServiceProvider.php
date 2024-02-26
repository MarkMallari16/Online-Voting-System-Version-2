<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {


        Validator::extend('school_email', function ($attribute, $value, $parameters, $validator) {
            // Simplified and improved regular expression for school email domain
            return preg_match('/^[a-zA-Z0-9._%+-]+@bacoor\.sti\.edu\.ph$/', $value);
        });

        Validator::replacer('school_email', function ($message, $attribute, $rule, $parameters) {
            // Customized error message for school_email validation rule
            return str_replace(':attribute', $attribute, 'The :attribute must be a valid email address for your school organization (bacoor.sti.edu.ph).');
        });
    }
}
