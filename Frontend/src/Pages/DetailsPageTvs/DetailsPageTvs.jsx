import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import ReactPlayer from 'react-player';
import SimilarTvsSlider from '../../Components/SimilarTvsSlider/SimilarTvsSlider';
import { UserContext } from '../../Context/UserContextProvider';

function DetailsPageMovie() {
  const {id}=useParams();
    // console.log(id);
    const [similarTvsArr,setSimilarTvsArr]=useState([]);
    const [tvsTrailer,setTvsTrailer]=useState([]);
    const [curIdx,setCurIdx]=useState(0);
    const [tvsDetails,setTvsDetails]=useState({});
    const [contentType,setContentType]=useState('Tvs Shows');
    const {userDetails}=useContext(UserContext);
    useEffect(()=>{
      if(!userDetails?._id){
        navigate('/');
       }
    },[])

    useEffect(()=>{
      const getMovieDetailsfFunction=async()=>{
        try {
          const response=await fetch(`http://localhost:10000/api/tv/details/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:"include"
          })
          const data=await response.json();
          setTvsDetails(data?.content)
         console.log(data);
        } catch (error) {
          console.log("ERROR WHILE FECTHING TV DETAILS FRONTEND",error);
        }
      }
      getMovieDetailsfFunction();
    },[id])


    useEffect(()=>{
      const getMovieTrailersFunction=async()=>{
        try {
          const response=await fetch(`http://localhost:10000/api/tv/trailers/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:"include"
          })
        const data=await response.json();
        setTvsTrailer(data?.content?.results)
         console.log("Movie Trailers",data);
        } catch (error) {
          if(error.message.includes('404')){
            setTvsTrailer([]);
          }
          console.log("ERROR WHILE FECTHING TVS TRAILERS FRONTEND",error);
        }
      }
      getMovieTrailersFunction();
    },[id,curIdx])


    useEffect(()=>{
      const getSimlarMoviesFunction=async()=>{
        try {
          const response=await fetch(`http://localhost:10000/api/tv/similar/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:"include"
          })
        const data=await response.json();
        setSimilarTvsArr(data?.content?.results)
         console.log(data);
        } catch (error) {
          console.log("ERROR WHILE FECTHING SIMILAR TVS FRONTEND",error);
        }
      }
      getSimlarMoviesFunction();
    },[id])

    const incIdx=()=>{
      if(curIdx<tvsTrailer.length-1){
        setCurIdx(curIdx+1);
      }
    }
    const decIdx=()=>{
      if(curIdx>=1){
        setCurIdx(curIdx-1);
      }
    }
  return (
    <main className='bg-black'>
    <Navbar/>
    <main className='h-fit min-[600px]:min-h-screen max-w-screen pt-[70px] text-white border-2 border-red-500'>
    
      {
        tvsTrailer?.length > 0 
        ?
        <>
        {/* CHEVRON BUTTON BOX */}
        <div className='flex text-black justify-between items-center my-2 px-10'>
            <button className='block bg-[#fffdfd] rounded-full p-2' onClick={decIdx}>
              <FaChevronLeft className='text-[30px]' />
            </button>
            <button className='block bg-[#ffffff] rounded-full p-2'onClick={incIdx} >
              <FaChevronRight className='text-[30px]' />
            </button>
        </div>
        {/* CONTENT TITLE BOX */}
        <div className='py-2 pl-[6%] text-white mb-2 text-[25px] min-[400px]:text-[30px] min-[600px]:text-[40px] font-bold'>{tvsDetails?.name}</div>
        {/* MOVIE TARILER BOX */}
        <div className='aspect-video h-[60vh] min-[600px]:h-[80vh] w-[90%] mx-auto flex justify-center items-center px-3 border-2 border-black'>
        <ReactPlayer 
        url={`https://www.youtube.com/watch?v=${tvsTrailer[curIdx].key}`} 
        controls={true}
        width={'100%'}
        height={'95%'}
        />
        </div>
        </>
        :
         <div className='w-full h-[40vh] font-bold flex items-center justify-center text-white text-[30px]'>
         <p className='shadow-[0px_0px_10px_0px-#ff0000] p-2'>Sorry unable to find results</p>
        </div>
      }
    </main>
    {/* TV DETAILS BOX */}
    {tvsDetails
    ?
    <section className='min-h-screen h-fit mt-[30px] min-[600px]:mt-[80px] text-white flex max-[600px]:gap-5 max-[600px]:flex-col items-center justify-center' >
      <div className='left-box-details flex  flex-col gap-1 w-[90%] min-[600px]:w-[55%]'>
        <h2 className='py-1  text-white text-[25px] min-[768px]:text-[30px] font-bold'>
          {tvsDetails?.name}
        </h2>
        <p className='text-white'><span>{tvsDetails?.first_air_date}</span> | <span>{tvsDetails?.episode_run_time} min</span></p>
       <p className='text-[20px] font-bold'>{
         tvsDetails?.genres?.map((item)=>{
            return (<span key={item.id}>{item.name} </span> )
          })
        }</p>
        <p className='text-white max-[768px]:text-[14px] w-[95%] min-[768px]:w-[80%]'>{tvsDetails?.overview}</p>
        <p className='text-white font-semibold text-[17px] min-[768px]:text-[20px]'>{tvsDetails.tagline}</p>
      </div>
      <div className='max-[600px]:mx-auto w-[80%] min-[600px]:w-[40%] min-[768px]:w-[30%]'>
        <img src={`https://image.tmdb.org/t/p/w500${tvsDetails?.poster_path}`} alt="" className='h-[50vh] min-[768px]:h-[70vh]'/>
      </div>
    </section>
     :
     <div className='w-full h-[40vh] font-bold flex items-center justify-center text-white text-[30px]'>
         <p className='shadow-[0px_0px_10px_0px-#ff0000] p-2'>Sorry unable to find results</p>
        </div>
}
    {/* SIMILAR MOVIES */}
    <SimilarTvsSlider similarContentArr={similarTvsArr} contentType={contentType}/>
    </main>
  )
}

export default DetailsPageMovie