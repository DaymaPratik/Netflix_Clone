import React, { createContext, useContext, useState } from 'react'
import { UserContext } from './UserContextProvider';
export const PlayListContext=createContext();
function PlayListContextProvider({children}) {
    const [playListArray,setPlayListArray]=useState([]);
    const {userDetails,setUserDetails}=useContext(UserContext)
    const addtoPlaylistFunction =async (item) => {
      const updatedPlaylist = [...playListArray, item];
      setPlayListArray(updatedPlaylist);
      setUserDetails({
        ...userDetails,
        playlist:updatedPlaylist
      })
     try {
      const response =await fetch('http://localhost:10000/api/addToPlaylist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userDetails),        
    })
    const data =await response.json();
    console.log(data);
     } catch (error) {
      console.log('Error saving playlist:', error)
     }
    }
  return (
    <PlayListContext.Provider value={{playListArray,addtoPlaylistFunction}}>
        {children}
    </PlayListContext.Provider>
  )
}

export default PlayListContextProvider