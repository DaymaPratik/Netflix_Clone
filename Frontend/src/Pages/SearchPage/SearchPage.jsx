import React, { useContext, useState ,useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { IoSearch } from "react-icons/io5";
import SimilarMoviesSlider from '../../Components/SimilarMoviesSlider/SimilarMoviesSlider';
import SimilarTvsSlider from '../../Components/SimilarTvsSlider/SimilarTvsSlider';
import SearchPersonBox from '../../Components/SearchPersonBox/SearchPersonBox';
import { UserContext } from '../../Context/UserContextProvider';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
    const [activeTab,setActiveTab]=useState('movie')
    const [contentType,setContentType]=useState('movie');
    const [searchQuery,setSearchQuery]=useState('');
    const [searchResultsArr,setSearchResultsArr]=useState([]);
    const {userDetails}=useContext(UserContext);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!userDetails?._id){
          navigate('/');
         }
      },[])
    const handleClick=(actTab)=>{
        setActiveTab(actTab);
        if(actTab==='tv'){
            setContentType('tv');
            setSearchResultsArr([]);
        }else if(actTab==='movie'){
            setContentType('movie');
            setSearchResultsArr([]);
        }else{
            setContentType('person');
            setSearchResultsArr([]);
        }
    }
    const searchFunction=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch(`https://netflix-clone-ghjh.onrender.com/api/search/${contentType}/${searchQuery}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data=await response.json();
            setSearchResultsArr(data?.content?.results);
            // console.log(data);
        } catch (error) {
            console.log("ERROR WHILE FETCHING SEARCH RESULTS FRONTEND",error); 
        }
    }
  return (
    <>
    <Navbar/>
    <main className='bg-black min-h-screen h-fit relative text-white pt-[100px]'>

        {/*  CONTENT TYPE BUTTON BOX */}
        <div className='flex items-center justify-center gap-3 py-2'>
            <button className={`${activeTab==='movie' ? 'bg-[#ff0000]' :'bg-[#3d3d3d]'} px-2 py-1 text-[20px] block rounded-sm`} onClick={()=>handleClick('movie')}>
                Movie
            </button>
            <button className={`${activeTab==='tv' ? 'bg-[#ff0000]' :'bg-[#3d3d3d]'} px-2 py-1 text-[20px] block rounded-sm`} onClick={()=>handleClick('tv')}>
                Tv Shows
            </button>
            <button className={`${activeTab==='person' ? 'bg-[#ff0000]' :'bg-[#3d3d3d]'} px-2 py-1 text-[20px] block rounded-sm`} onClick={()=>handleClick('person')}>
                Person
            </button>
        </div>
        {/* INPUT BOX */}
        <form action="" className='w-full py-2 border-2 border-red-300 flex justify-center items-center gap-2'>
        <input type="text" placeholder={`Search for a ${contentType}`} value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} 
        className=' bg-[#3d3d3d] w-[50%] py-1 rounded-md text-[25px] px-2  outline-none focus:outline-[#ff0000] '/>
        <button className="text-[25px] min-[500px]:text-[35px] p-1 text-white bg-[#ff0000] rounded-sm" onClick={searchFunction}>
          <IoSearch />
        </button>
        </form>

        {/* SeARCH RESULTS BOX */}
       {
        searchResultsArr?.length > 0
        ?
        <div>
        {
           contentType ==='movie' && <SimilarMoviesSlider similarContentArr={searchResultsArr} contentType={contentType}/> 
        }
        {
             contentType ==='tv' && <SimilarTvsSlider similarContentArr={searchResultsArr} contentType={contentType}/>
        }
        {
            contentType ==='person' && <SearchPersonBox similarContentArr={searchResultsArr} contentType={contentType}/>
        }
    </div>
    :
      <div className='w-full h-[40vh] font-bold flex items-center justify-center text-white text-[30px]'>
       {
        contentType ?  <p>Please Search....</p> :  <p>Results Not Found...</p>
        }
      </div>
       }
    </main>
    </>
  )
}

export default SearchPage