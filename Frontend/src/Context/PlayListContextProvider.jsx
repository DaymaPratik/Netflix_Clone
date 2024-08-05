import React, {createContext, useState, useContext } from 'react';
import { UserContext } from './UserContextProvider';
import { toast } from 'react-toastify';
export const PlayListContext=createContext();
function PlayListContextProvider({ children }) {
    const [playListArray, setPlayListArray] = useState([]);
    const { userDetails, setUserDetails } = useContext(UserContext);

    const addtoPlaylistFunction = async (item) => {
        // Update the playlist state
        setPlayListArray((prevArray) => {
            const newArray = [...prevArray, item];
            
            // Update userDetails with the new playlist array
            setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                playlist: newArray
            }));
            
            // Return the newArray to update the state
            return newArray;
        });

        try {
            const response = await fetch('https://netflix-clone-ghjh.onrender.com/api/addToPlaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    _id: userDetails._id, // Assuming you need user ID
                    playlist: [...playListArray, item] // Send the updated playlist
                }),
            });

            const data = await response.json();
            toast.success("Added To Playlist");
            console.log(data);
        } catch (error) {
            console.log('Error saving playlist:', error);
           console.log("Unable to Add to Playlist");
           
        }
    };

    return (
        <PlayListContext.Provider value={{ playListArray, addtoPlaylistFunction ,setPlayListArray}}>
            {children}
        </PlayListContext.Provider>
    );
}

export default PlayListContextProvider;
