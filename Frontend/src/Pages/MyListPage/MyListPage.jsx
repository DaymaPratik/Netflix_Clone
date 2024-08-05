import React, { useContext, useEffect, useState } from 'react'
import { PlayListContext } from '../../Context/PlayListContextProvider'
import { UserContext } from '../../Context/UserContextProvider';
import Navbar from '../../Components/Navbar/Navbar';
import { toast } from 'react-toastify';
function MyListPage() {
  const {playListArray,setPlayListArray}=useContext(PlayListContext);
  const {userDetails,setUserDetails}=useContext(UserContext);
  const [hoveredItem,setHoveredItem]=useState(null);


  const deleteFromPlayListFunction= async(obj)=>{
    const modifiedArray=playListArray.filter((item,idx)=>{
      return obj.name !== item.name || obj.title !== item.title;
    })
    setPlayListArray(modifiedArray);
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      playlist: newArray
  }));
   try {
     const response=await fetch('https://netflix-clone-ghjh.onrender.com/api/deleteItem',{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify(userDetails)
     })
     const data=await response.json();
     console.log(data);
     toast.success("Deleted Form Palylist");
     
   } catch (error) {
    console.log("FRONTEND ERROR WHLE DELETING ITEM FROM PLAYLIST",error);
    toast.error("Not Able To Delete From Playlist");
    
   }
    
  }
  const showMyPlayListFunction=async()=>{
    try {
      const response=await fetch(`https://netflix-clone-ghjh.onrender.com/api/getPlaylist/${userDetails._id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const data=await response.json();

      console.log(data);
      // setPlayListArray(data.playListArray);
      
    }
     catch (error) {
      console.log("ERROR WHLE GET PLAYLIST FRONTENT",error);
    }
  }
  useEffect(()=>{
    showMyPlayListFunction();
  },[playListArray])
  return (
    <main className='bg-black'>
    <Navbar/>
    <h2 className='text-[30px] font-bold text-center py-2 text-[#ff0000] relative top-[80px]'>Your Watchlist</h2>
   {
    playListArray?.length > 0
    ?
    <div className='min-h-screen h-fit w-[95%] min-[1024px]:w-[90%] mx-auto bg-black text-white py-[100px] grid grid-cols-1 min-[400px]:grid-cols-2 min-[600px]:grid-cols-3 min-[1024px]:grid-cols-4 gap-5 min-[1024px]:gap-10'>
    {
      playListArray?.map((item,idx)=>{
        return(
          <div key={idx} className='h-[220px] min-[400px]:h-[280px] min-[768px]:h-[350px] shadow-[0px_0px_5px_1px_#ff0000]  p-2 relative flex flex-col items-center justify-center gap-2 cursor-pointer rounded-lg ' >
            <div className='absolute w-full h-full hover:bg-[#0000006e] top-0 left-0 flex transition ease-in duration-150 justify-center items-center' onMouseEnter={()=>{setHoveredItem(idx)}} onMouseLeave={()=>{setHoveredItem(null)}}>
              {hoveredItem === idx && <button className='bg-[#ff0000] px-3 py-1 rounded-sm text-white' onClick={(e)=>{
                e.stopPropagation();
                e.preventDefault();
                deleteFromPlayListFunction(item);
              }}>Remove</button>}
            </div>
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" className='object-contain h-[75%] mx-auto'/>
            <p className='text-[15px] min-[768px]:text-[20px] text-center font-bold'>{item.name || item.title}</p>
          </div>
        )
      })
    }
  </div>
     :
     <div className='h-[90vh] text-[#ff0000] w-full flex items-center justify-center bg-black'>
      <h3 className='w-[70%] text-[30px] font-bold py-2 text-center shadow-[0px_0px_7px_1px_#ff0000] '>Seems Like you do no have created playlist yet ....</h3>
     </div>
   }
    </main>
  )
}

export default MyListPage