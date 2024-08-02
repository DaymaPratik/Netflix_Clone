import React, { useEffect,useRef,useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import '../../index.css'
import { Link } from 'react-router-dom';

function SimilarMoviesSlider({similarContentArr,contentType}) {
    const [showArrows,setShowArrows]=useState(false);
    const sliderRef=useRef(null);
    const scrollLeft=()=>{
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:'smooth'})
        }
    }
    const scrollRight=()=>{
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth,behavior:'smooth'})
        }
    }
  return (
   similarContentArr?.length > 0
   ?
   <main className='relative mx-auto pb-10  w-[98%] min-[1256px]:w-[90%]'
   onMouseLeave={()=>{setShowArrows(false)}}
   onMouseEnter={()=>{setShowArrows(true)}}
   >
   <h2 className='bg-black text-white text-[18px] min-[600px]:text-[35px]  font-semibold pl-[10px] min-[600px]:pl-[15px] min-[768px]:pl-[20px] py-3 uppercase'>
       Similar {contentType}
   </h2>
   <section className='my-2 min-h-fit overflow-x-scroll hide-scrollbar gap-3 flex '
   ref={sliderRef}
   >
    {
       similarContentArr?.map((item,idx)=>{
           return(
               <Link to={`/movie/details/${item.id}`} key={idx}>
               <div className='flex flex-col  h-[140px] min-[600px]:h-[200px] min-[768px]:h-[250px] min-[1024px]:h-[280px] min-[1256px]:h-[420px]'>
               <div key={idx} className='w-[130px] min-[600px]:w-[170px] min-[768px]:w-[200px] min-[1024px]:w-[250px] min-[1256px]:w-[320px] overflow-hidden rounded-md '>
                   <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" className='transition duration-200 ease-in hover:scale-125 hover:opacity-60' />   
               </div>
               <p className='text-[white] text-center text-[12px] min-[768px]:text-[20px] mt-2'>{item.title}</p>
               </div>
               </Link>
           )
       })
    }
    {
       showArrows && 
       <>
       <button onClick={scrollLeft} className='absolute top-[50%] -translate-y-1/2 left-1 min-[600px]:left-3 flex items-center justify-center size-5 min-[600px]:size-12 rounded-full bg-black text-white'><FaChevronLeft/></button>
       <button onClick={scrollRight} className='absolute top-[50%]   -translate-y-1/2 right-1 min-[600px]:right-3 flex items-center justify-center size-5 min-[600px]:size-12 rounded-full bg-black text-white'><FaChevronRight/></button>
       </>
    }
   </section>
   </main>
   :
   <div className='w-full h-[40vh] font-bold flex items-center justify-center text-white text-[30px]'>
     <p className='shadow-[0px_0px_10px_0px-#ff0000] p-2'>Sorry unable to find results</p>
    </div>
  )
}

export default SimilarMoviesSlider