import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContextProvider'; // Ensure this file exists and exports UserContext
import { toast } from 'react-toastify';

export const PlayListContext = createContext();

function PlayListContextProvider({ children }) {
    const [playListArray, setPlayListArray] = useState([]);
    const { userDetails, setUserDetails } = useContext(UserContext);

    const addtoPlaylistFunction = async (item) => {
        // Update the playlist state and user details
        setPlayListArray((prevArray) => {
            const newArray = [...prevArray, item];

            // Update userDetails with the new playlist array
            setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                playlist: newArray
            }));

            return newArray;
        });

        try {
            // Fetch request to update the playlist on the server
            const response = await fetch('https://netflix-clone-ghjh.onrender.com/api/addToPlaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    _id: userDetails._id, // Ensure userDetails._id is valid
                    playlist: [...playListArray, item] // Updated playlist
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            toast.success("Added To Playlist");
            console.log(data);
        } catch (error) {
            toast.error("Unable to Add to Playlist");
            console.error('Error saving playlist:', error);
        }
    };

    return (
        <PlayListContext.Provider value={{ playListArray, addtoPlaylistFunction, setPlayListArray }}>
            {children}
        </PlayListContext.Provider>
    );
}

export default PlayListContextProvider;
