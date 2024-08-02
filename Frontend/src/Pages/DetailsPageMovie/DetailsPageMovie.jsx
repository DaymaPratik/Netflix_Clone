import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import ReactPlayer from 'react-player';
import SimilarMoviesSlider from '../../Components/SimilarMoviesSlider/SimilarMoviesSlider';
import { UserContext } from '../../Context/UserContextProvider';

function DetailsPageMovie() {
  const {id}=useParams();
    // console.log(id);
    const [similarMoviesArr,setSimilarMoviesArr]=useState([]);
    const {userDetails}=useContext(UserContext);
    const [moviesTrailer,setMoviesTrailer]=useState([]);
    const [curIdx,setCurIdx]=useState(0);
    const [moviesDetails,setMoviesDetails]=useState({});
    const [contentType,setContentType]=useState('Movies');
    useEffect(()=>{
      if(!userDetails?._id){
        navigate('/');
       }
    },[])
  
    useEffect(()=>{
      const getMovieDetailsfFunction=async()=>{
        try {
          const response=await fetch(`http://localhost:10000/api/movie/details/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:"include"
          })
          const data=await response.json();
          setMoviesDetails(data?.content)
         console.log(data);
        } catch (error) {
          console.log("ERROR WHILE FECTHING MOVIE DETAILS FRONTEND",error);
        }
      }
      getMovieDetailsfFunction();
    },[id])


    useEffect(()=>{
      const getMovieTrailersFunction=async()=>{
        try {
          const response=await fetch(`http://localhost:10000/api/movie/trailers/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:"include"
          })
        const data=await response.json();
        setMoviesTrailer(data?.content?.results)
         console.log("Movie Trailers",moviesTrailer);
        } catch (error) {
          if(error.message.includes('404')){
            setMoviesTrailer([]);
          }
          console.log("ERROR WHILE FECTHING MOVIE TRAILERS FRONTEND",error);
        }
      }
      getMovieTrailersFunction();
    },[id,curIdx])


    useEffect(()=>{
      const getSimlarMoviesFunction=async()=>{
        try {
          const response=await fetch(`http://localhost:10000/api/movie/similar/${id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:"include"
          })
        const data=await response.json();
        setSimilarMoviesArr(data?.content?.results)
         console.log(data);
        } catch (error) {
          console.log("ERROR WHILE FECTHING SIMILAR MOVIES FRONTEND",error);
        }
      }
      getSimlarMoviesFunction();
    },[id])

    const incIdx=()=>{
      if(curIdx<moviesTrailer.length-1){
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
    <main className='h-fit min-[600px]:min-h-screen max-w-screen pt-[70px] text-white'>
    
      {
        moviesTrailer?.length > 0 
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
        <div className='py-2 pl-[6%] text-white mb-2 text-[25px] min-[400px]:text-[30px] min-[600px]:text-[40px] font-bold'>{moviesDetails?.title}</div>
        {/* MOVIE TARILER BOX */}
        <div className='aspect-video h-[60vh] min-[600px]:h-[80vh] w-[90%] mx-auto flex justify-center items-center px-3 border-2 border-black'>
        <ReactPlayer 
        url={`https://www.youtube.com/watch?v=${moviesTrailer[curIdx].key}`} 
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


    {/* MOVIE DETAILS BOX */}
    {moviesDetails
    ?
    <section className='min-h-screen h-fit mt-[30px] min-[600px]:mt-[80px] text-white flex max-[600px]:gap-5 max-[600px]:flex-col items-center justify-center' >
      <div className='left-box-details flex  flex-col gap-1 w-[90%] min-[600px]:w-[55%]'>
        <h2 className='py-1  text-white text-[25px] min-[768px]:text-[30px] font-bold'>
          {moviesDetails?.title}
        </h2>
        <p className='text-white'><span>{moviesDetails?.release_date}</span> | <span>{moviesDetails?.runtime} min</span></p>
       <p className='text-[20px] font-bold'>{
          moviesDetails?.genres?.map((item)=>{
            return (<span key={item.id}>{item.name} </span> )
          })
        }</p>
        <p className='text-white max-[768px]:text-[14px] w-[95%] min-[768px]:w-[80%]'>{moviesDetails?.overview}</p>
        <p className='text-white font-semibold text-[17px] min-[768px]:text-[20px]'>{moviesDetails?.tagline}</p>
      </div>
      <div className='max-[600px]:mx-auto w-[80%] min-[600px]:w-[40%] min-[768px]:w-[30%]'>
        <img src={`https://image.tmdb.org/t/p/w500${moviesDetails?.poster_path}`} alt="" className='h-[50vh] min-[768px]:h-[70vh]'/>
      </div>
    </section>
    :
    <div className='w-full h-[40vh] font-bold flex items-center justify-center text-white text-[30px]'>
         <p className='shadow-[0px_0px_10px_0px-#ff0000] p-2'>Sorry unable to find results</p>
        </div>
        }


    {/* SIMILAR MOVIES */}
    <SimilarMoviesSlider similarContentArr={similarMoviesArr} contentType={contentType}/>
    </main>
  )
}

export default DetailsPageMovie