import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContextProvider';
import { toast } from 'react-toastify';

export const PlayListContext = createContext();

function PlayListContextProvider({ children }) {
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [playListArray, setPlayListArray] = useState(() => {
        const savedPlaylist = JSON.parse(sessionStorage.getItem('playlist'));
        return savedPlaylist || [];
    });

    useEffect(() => {
        sessionStorage.setItem('playlist', JSON.stringify(playListArray));
    }, [playListArray]);

    const addtoPlaylistFunction = async (item) => {
        // Temporarily store the new item in the playlist
        const updatedPlayList = [...playListArray, item];

        setPlayListArray(updatedPlayList); // Update the playlist array

        try {
            const response = await fetch('https://netflix-clone-ghjh.onrender.com/api/addToPlaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ ...userDetails, playlist: updatedPlayList }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // setUserDetails(data.user); // Update userDetails with server response

            // Toast and log the successful addition
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















// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { UserContext } from './UserContextProvider';
// import { toast } from 'react-toastify';

// export const PlayListContext = createContext();

// function PlayListContextProvider({ children }) {
//     const { userDetails, setUserDetails } = useContext(UserContext);
//     const [playListArray, setPlayListArray] = useState(() => {
//         const savedPlaylist = JSON.parse(sessionStorage.getItem('playlist'));
//         return savedPlaylist || [];
//     });

//     useEffect(() => {
//         // Update UserContext when the component mounts or `playListArray` changes
//         setUserDetails((prevDetails) => ({
//             ...prevDetails,
//             playlist: playListArray,
//         }));
//     }, [playListArray, setUserDetails]);

//     useEffect(() => {
//         sessionStorage.setItem('playlist', JSON.stringify(playListArray));
//     }, [playListArray]);

//     const addtoPlaylistFunction = async (item) => {
//         setPlayListArray((prevArray) => {
//             const newArray = [...prevArray, item];
//             return newArray;
//         });

//         try {
//             const response = await fetch('https://netflix-clone-ghjh.onrender.com/api/addToPlaylist', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify(userDetails),
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             setUserDetails(data.user);
//             toast.success("Added To Playlist");
//             console.log(data);
//         } catch (error) {
//             toast.error("Unable to Add to Playlist");
//             console.error('Error saving playlist:', error);
//         }
//     };

//     return (
//         <PlayListContext.Provider value={{ playListArray, addtoPlaylistFunction, setPlayListArray }}>
//             {children}
//         </PlayListContext.Provider>
//     );
// }

// export default PlayListContextProvider;
