<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->with('user')->get();

        return response()->json(['posts' => $posts]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $post = Post::create([
            'user_id' => $user->id,
            'content' => $request->input('content')
        ]);
        return response()->json(compact('post'));
    }

    public function getPosts(Request $request, $offset = 0, $limit = 10)
    {
        $cacheKey = 'posts:' . $offset . ':' . $limit;
        $posts = Cache::remember($cacheKey, 60, function () use ($offset, $limit) {
            return Post::with('user')
                ->latest()
                ->skip($offset)
                ->take($limit)
                ->get();
        });

        return response()->json([
            'posts' => $posts,
        ]);
    }
}
