const fetchFromTMDB=require('../tmdbServices');

const fetchTrendingTvSingleFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1');
        if (response.results && response.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.results.length);
            const randomMovie = response.results[randomIndex];
            // console.log("BACKEND FUNCTION TRENDING SINGLE MOVIE", randomMovie);
        res.status(200).json({success:true,message:"Getting SINGLE popular TV SHOWS",content:randomMovie});
        } 
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING SINGLE POPULAR TV SHOW",error);
    }
}
const fetchPopularTvsFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1');
        // console.log(response.results);
        res.status(200).json({success:true,message:"Getting ALL popular TV SHOWS",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING ALL POPULAR TV SHOWS",error);
    }
}
const nowPlayingTvsFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1');
        // console.log(response.results);
        res.status(200).json({success:true,message:"Now Playing TV SHOWS",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING NOW PLAYING TV SHOWS",error);
    }
}

const topRatedTvsFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1');
        // console.log(response.results);
        res.status(200).json({success:true,message:"TOP RATED TV SHOWS",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING TOP RATED TV SHOWS",error);
    }
}

const upcomingTvsFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1');
        // console.log(response.results);
        res.status(200).json({success:true,message:"TOP UPCOMING TV SHOWS",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING UPCOMING TV SHOWS",error);
    }
}

const tvDetailsFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({
            success:true,
            message:"GETTIING TV DETAILS",
            content:response
        })
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR WHILE GETTING TV DETAILS BACKEND",error);
    }
}
const tvTrailersFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({
            success:true,
            message:"GETTIING TVS TRAILERS",
            content:response
        })
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR WHILE GETTING TVS TAILERS BACKEND",error);
    }
}

const tvSimilarFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({
            success:true,
            message:"GETTIING SIMILAR TV ",
            content:response
        })
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR WHILE GETTING SIMILAR TV BACKEND",error);
    }
}
const fetchTrendingTvsFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        // console.log(response.results);
        res.status(200).json({success:true,message:"Getting ALL Trending TV SHOWS",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING ALL TRENDING TV SHOWS",error);
    }
}
module.exports={tvSimilarFunction,tvTrailersFunction,tvDetailsFunction,fetchTrendingTvSingleFunction,fetchPopularTvsFunction,
    nowPlayingTvsFunction,topRatedTvsFunction,upcomingTvsFunction,fetchTrendingTvsFunction};
