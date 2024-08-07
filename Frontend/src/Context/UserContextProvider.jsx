import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PlayListContext } from './PlayListContextProvider';
export const UserContext=createContext();
function UserContextProvider({children}) {
    const navigate=useNavigate();
    const {playListArray}=useContext(PlayListContext);
    const [userDetails,setUserDetails]=useState(()=>{
        const savedUserDetails=JSON.parse(sessionStorage.getItem('userDetail'));
        return savedUserDetails ? savedUserDetails : {
            userName:"",
            email:"",
            password:"",
            _id:"",
            _v:"",
            playlist:[]
        }
    })
    useEffect(()=>{
        sessionStorage.setItem('userDetail',JSON.stringify(userDetails));
    },[userDetails,playListArray])

    const logout = () => {
        setUserDetails({
          userName: "",
          email: "",
          password: "",
          _id:"",
          __v:"",
          playlist:[]
        });
        sessionStorage.removeItem('userDetails');
        navigate('/');
        
        toast.success("Logged Out Successfully")
      };
  return (
    <UserContext.Provider value={{userDetails,setUserDetails,logout}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider