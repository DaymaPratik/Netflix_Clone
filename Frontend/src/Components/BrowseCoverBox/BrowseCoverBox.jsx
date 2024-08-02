import React, { useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { Link } from "react-router-dom";

function BrowseCoverBox({coverObj}) {
  return (
   coverObj 
   ?
   <main className='h-fit min-h-[70vh] min-[600px]:min-h-screen max-w-screen border-2 border-black relative py-[100px] flex items-center min-[600px]:pl-[50px] max-[600px]:justify-center'
   style={{
     backgroundImage: `url('https://image.tmdb.org/t/p/original/${coverObj.poster_path}')`,
     backgroundSize: 'cover',
     backgroundPosition: 'center',
     backgroundRepeat: 'no-repeat'
   }}
   >
   <div className='w-full h-full bg-[#00000095] absolute  top-0 left-0'></div>

    <div className='text-white  w-[90%] min-[1024px]:w-[70%] h-fit px-1 min-[450px]:px-3 py-1 min-[450px]:py-3 min-[768px]:py-5 border-2 border-white z-10 
    '>
    <h1 className='p-1 min-[600px]:p-3 text-[25px] min-[500px]:text-[35px] min-[768px]:text-[50px] font-extrabold text-red-600'>{coverObj.title || coverObj.name}</h1>
    <p className='text-[12px] min-[600px]:text-[17px] font-semibold p-1 min-[600px]:p-3 w-[90%] min-[768px]:w-[70%]'>{coverObj.overview}</p>

    <div className='flex gap-5 items-center justify-center px-2 w-fit my-3'>
      <Link to={'/watch'}>
      <button className='bg-[#ffffff] text-[12px] min-[400px]:text-[15px] min-[600px]:text-[20px] px-2 min-[500px]:px-5 py-1 min-[600px]:py-2 rounded-sm 
       text-black flex justify-center items-center  gap-2' >
           <FaPlay className='block text-[15px] min-[400px]:text-[20px] min-[600px]:text-[30px]'/>
           Play
       </button>
      </Link>
       <button className='bg-[#ffffff] text-[12px] min-[400px]:text-[15px] min-[600px]:text-[20px] px-2 min-[500px]:px-5 py-1 min-[600px]:py-2 rounded-sm text-black 
       flex justify-center items-center  gap-2'>
       <GoInfo className='block text-[15px] min-[400px]:text-[20px] min-[600px]:text-[30px]'/>
           More Info
       </button>
    </div>

    </div>

   </main>
   :
   <div className='w-full h-[40vh] font-bold flex items-center justify-center text-white text-[30px]'>
    <p className='shadow-[0px_0px_10px_0px-#ff0000] p-2'>Sorry unable to find results</p>
   </div>
  )
}

export default BrowseCoverBox;
















// style={{
//     backgroundImage: `url('https://image.tmdb.org/t/p/w500${coverMovie.poster_path}')`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat'
//   }}

// absolute top-[20%] min-[600px]:top-[30%] left-[5] min-[768px]:left-14