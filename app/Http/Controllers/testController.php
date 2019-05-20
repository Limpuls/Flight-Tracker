<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class testController extends Controller
{
    public function test() {
        $manuf = DB::table('Manufacturers')->get();
        print_r($manuf);
    }
}
