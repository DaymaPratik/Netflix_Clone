import { useContext, useEffect, useState } from "react";
import BrowseCoverBox from "../../Components/BrowseCoverBox/BrowseCoverBox"
import Navbar from "../../Components/Navbar/Navbar"
import { LoadingContext } from "../../Context/LoadingContextProvider";
import BounceLoader from "react-spinners/BounceLoader"
import MovieSlider from "../../Components/MovieSlider/MovieSlider";
import TvsSlider from "../../Components/TvsSlider/TvsSlider";
import { UserContext } from "../../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function BrowsePage() {
  const {loading,setLoading}=useContext(LoadingContext)
  const {userDetails}=useContext(UserContext);
  const [coverObj,setCoverObj]=useState({});
  const [contentType,setContentType]=useState('Movie');
  const categoryOfMovies=['trending','popular','top_rated','upcoming','now_playing']
  const categoryOfTvs=['trending','popular','on_the_air','top_rateds','airing_today']
  const navigate=useNavigate();
const getTrendingCoverFunction=async()=>{
  setLoading(true);
  try {
    const response=await fetch(`https://netflix-clone-ghjh.onrender.com/api/trendingSingle${contentType}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    
    const data=await response.json();
    setCoverObj(data.content);
  } catch (error) {
    console.log("ERROR FRONTEND WHILE FECTHING SINGLE TRENDING MOVIE",error);
  }finally{
     setTimeout(()=>{
      setLoading(false)
     },100)
  }
}
useEffect(()=>{
   if(!userDetails?._id){
    navigate('/');
   }
  getTrendingCoverFunction();
},[])
  return (
   <>
   {
    loading
    ?
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <BounceLoader
        color='red'
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"/>
    </div>
    :
   <>
    <Navbar/>
   <BrowseCoverBox coverObj={coverObj}/>
   <section className="flex flex-col justify-center gap-10 items-center bg-black">
   {
    categoryOfMovies?.map((singleCategory,idx)=>{
      return (
      <MovieSlider  singleCategory={singleCategory} key={idx}/>
      )
    })
   }
   </section>
   <section className="flex flex-col justify-center gap-10 items-center py-5 bg-black">
   {
    categoryOfTvs?.map((singleCategory,idx)=>{
      return (
      <TvsSlider singleCategory={singleCategory} key={idx}/>
      )
    })
   }
   </section>
   </>
   }
   </>
  )
}

export default BrowsePage