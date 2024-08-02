const fetchFromTMDB=require('../tmdbServices');

const fetchTrendingMovieSingleFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        if (response.results && response.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.results.length);
            const randomMovie = response.results[randomIndex];
            // console.log("BACKEND FUNCTION TRENDING SINGLE MOVIE", randomMovie);
        res.status(200).json({success:true,message:"Getting SINGLE popular movies",content:randomMovie});
        } 
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING SINGLE POPULAR MOVIE",error);
    }
}
const fetchPopularMoviesFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        // console.log(response.results);
        res.status(200).json({success:true,message:"Getting ALL popular movies",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING ALL POPULAR MOVIES",error);
    }
}
const nowPlayingMovieFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1');
        // console.log(response.results);
        res.status(200).json({success:true,message:"Now Playing movies",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING NOW PLAYING MOVIE",error);
    }
}

const topRatedMoviesFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
        // console.log(response.results);
        res.status(200).json({success:true,message:"TOP RATED movies",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING TOP RATED MOVIE",error);
    }
}

const upcomingMoviesFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1');
        // console.log(response.results);
        res.status(200).json({success:true,message:"TOP UPCOMING movies",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING UPCOMING MOVIE",error);
    }
}



const movieDetailsFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({
            success:true,
            message:"GETTIING MOVIE DETAILS",
            content:response
        })
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR WHILE GETTING MMOVIE DETAILS BACKEND",error);
    }
}

const movieTrailersFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.status(200).json({
            success:true,
            message:"GETTIING MOVIE TRAILERS",
            content:response
        })
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR WHILE GETTING MMOVIE TAILERS BACKEND",error);
    }
}
const movieSimilarFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({
            success:true,
            message:"GETTIING SIMILAR MOVIE ",
            content:response
        })
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR WHILE GETTING SIMILAR MOVIES BACKEND",error);
    }
}
const fetchTrendingMoviesFunction=async(req,res)=>{
    try {
        const response=await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        // console.log(response.results);
        res.status(200).json({success:true,message:"Getting ALL Trending Movies SHOWS",content:response.results});
        
    } catch (error) {
        res.status(400).json({success:false,message:"Sorry unable to fetch details"})
        console.log("ERROR FROM BACKEND FETCHING ALL TRENDING Movies SHOWS",error);
    }
}
const fetchSearchedDetailFunction=async(req,res)=>{
   const {serachType,searchQuery}=req.params;
   try {
    const response =await fetchFromTMDB(`https://api.themoviedb.org/3/search/${serachType}?query=${searchQuery}&include_adult=false&language=en-US&page=1`)
    res.status(200).json({success:true,message:"Gteting search results",content:response})
    console.log(response);
   } catch (error) {
    res.status(400).json({success:false,message:"Sorry unable to fetch details"})
    console.log("ERROR WHILE SEARCHING BACKEND ",error);
   }
}
module.exports={fetchTrendingMoviesFunction,movieSimilarFunction,movieTrailersFunction,movieDetailsFunction,fetchTrendingMovieSingleFunction,
    fetchPopularMoviesFunction,nowPlayingMovieFunction,topRatedMoviesFunction,upcomingMoviesFunction,fetchSearchedDetailFunction};
