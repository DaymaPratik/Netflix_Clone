const express=require("express");
const router=express.Router();
const {tvSimilarFunction,fetchTrendingTvSingleFunction,fetchPopularTvsFunction,
    nowPlayingTvsFunction,topRatedTvsFunction,upcomingTvsFunction,tvDetailsFunction,tvTrailersFunction,fetchTrendingTvsFunction}=require('../Controllers/tvsController');
router.get('/api/trendingSingleTv',fetchTrendingTvSingleFunction);
router.get('/api/tv/trending',fetchTrendingTvsFunction);
router.get('/api/tv/popular',fetchPopularTvsFunction);
router.get('/api/tv/on_the_air',nowPlayingTvsFunction);
router.get('/api/tv/top_rateds',topRatedTvsFunction);
router.get('/api/tv/airing_today',upcomingTvsFunction)
router.get('/api/tv/details/:id',tvDetailsFunction);
router.get('/api/tv/trailers/:id',tvTrailersFunction);
router.get('/api/tv/similar/:id',tvSimilarFunction);

module.exports=router;