import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { LoadingContext } from "../../Context/LoadingContextProvider";
import { GiCrossedBones } from "react-icons/gi";
import { UserContext } from "../../Context/UserContextProvider";
function Navbar() {
  const {logout}=useContext(UserContext);
  const { openSideBar, setOpenSideBar } = useContext(LoadingContext);
  return (
    <nav className="flex items-center py-3 w-full justify-between px-[10px] min-[500px]:px-[20px] min-[1024px]:px-[50px] bg-gradient-to-b from-[#000000e8] to-[#00000020]  fixed top-0 z-40">
      {openSideBar && (
        <div className="relative top-0 left-0 w-[80%] h-fit py-10 px-3 flex flex-col  items-center gap-4 text-white z-50 bg-[#000000b4]  shadow-[0px_0px_10px_0px_red]">
          <div className="text-[#ff0000] absolute top-1 right-1 text-[30px]" onClick={()=>{setOpenSideBar(false)}}><GiCrossedBones/></div>
          <Link to={"/browse"}>
            <button>Home</button>
          </Link>
          <Link to={"/tvspage"}>
            <button>Tv Shows</button>
          </Link>
          <Link to={"/movies"}>
            <button>Movies</button>
          </Link>
          <Link to={"/mylist"}>
            <button>My List</button>
          </Link>
          <Link to={"/history"}>
            <button>History</button>
          </Link>
        </div>
      )}
      <div className="min-[768px]:hidden flex items-center  min-[500px]:gap-2">
        <div className="text-[30px] text-white " onClick={()=>{setOpenSideBar(true)}}>
          <GiHamburgerMenu />
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="netflix-logo"
          className="h-[50px] max-[500px]:hidden"
        />
        <img
          src="https://yt3.googleusercontent.com/haakxzxYsFMSdeXaCrA_Yag87fANjsALOmZwEqjxzeAeeLGVfZdVSbwhr1cGadkn5Qdy9fwA=s900-c-k-c0x00ffffff-no-rj"
          alt=""
          className="h-[50px] min-[500px]:hidden"
        />
      </div>
      <div className="flex justify-center items-center min-[1024px]:text-[20px] text-[15px] gap-2 min-[1024px]:gap-4 text-white max-[768px]:hidden">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="netflix-logo"
          className="h-[50px]"
        />
        <Link to={"/browse"}>
          <button>Home</button>
        </Link>
        <Link to={"/tvspage"}>
          <button>Tv Shows</button>
        </Link>
        <Link to={"/movies"}>
          <button>Movies</button>
        </Link>
        <Link to={"/mylist"}>
          <button>My List</button>
        </Link>
        <Link to={"/history"}>
          <button>History</button>
        </Link>
      </div>
      <div className="flex items-center justify-end gap-1 min-[500px]:gap-3">
       <Link to={'/search'}>
       <button className="text-[25px] min-[500px]:text-[30px] text-white" >
          <IoSearch />
        </button>
       </Link>
        <img
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
          alt=""
          className="cursor-pointer rounded-md h-[34px] min-[500px]:h-[45px]"
        />
       <Link to={'/'}>
       <button className="bg-[#ff0000] rounded-md text-white px-2 py-1 text-[18px] min-[500px]:text-[25px]" onClick={logout}>
          Logout
        </button>
       </Link>
      </div>
    </nav>
  );
}

export default Navbar;
