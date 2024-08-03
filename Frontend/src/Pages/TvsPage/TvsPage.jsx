import { useContext, useEffect, useState } from "react";
import BrowseCoverBox from "../../Components/BrowseCoverBox/BrowseCoverBox"
import Navbar from "../../Components/Navbar/Navbar"
import { LoadingContext } from "../../Context/LoadingContextProvider";
import BounceLoader from "react-spinners/BounceLoader"
import TvsSlider from "../../Components/TvsSlider/TvsSlider";
import { UserContext } from "../../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";

function BrowsePage() {
  const [coverObj,setCoverObj]=useState({});
  const {loading,setLoading}=useContext(LoadingContext)
  const [contentType,setContentType]=useState('Tv');
  const categoryOfTvs=['popular','on_the_air','top_rateds','airing_today','trending']
  const {userDetails}=useContext(UserContext);
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
    console.log("ERROR FRONTEND WHILE FECTHING SINGLE TRENDING TV",error);
  }finally{
    setTimeout(()=>{
     setLoading(false)
    },1000)
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