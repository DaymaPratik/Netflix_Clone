const express=require("express");
const router=express.Router();
const {movieSimilarFunction,movieTrailersFunction,fetchTrendingMovieSingleFunction,fetchPopularMoviesFunction,
    nowPlayingMovieFunction,topRatedMoviesFunction,upcomingMoviesFunction,movieDetailsFunction,fetchTrendingMoviesFunction,fetchSearchedDetailFunction}=require('../Controllers/movieController');
router.get('/api/trendingSingleMovie',fetchTrendingMovieSingleFunction);
router.get('/api/movie/popular',fetchPopularMoviesFunction);
router.get('/api/movie/now_playing',nowPlayingMovieFunction);
router.get('/api/movie/top_rated',topRatedMoviesFunction);
router.get('/api/movie/upcoming',upcomingMoviesFunction)
router.get('/api/movie/details/:id',movieDetailsFunction);
router.get('/api/movie/trailers/:id',movieTrailersFunction);
router.get('/api/movie/similar/:id',movieSimilarFunction);
router.get('/api/movie/trending',fetchTrendingMoviesFunction);



router.get('/api/search/:serachType/:searchQuery',fetchSearchedDetailFunction)

module.exports=router;