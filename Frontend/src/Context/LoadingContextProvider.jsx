import {  createContext, useState } from "react";
export const LoadingContext=createContext();
function LoadingContextProvider({children}) {
    
    const [loading,setLoading]=useState(false);
    const [openSideBar,setOpenSideBar]=useState(false);
  return (
    <LoadingContext.Provider value={{loading,setLoading,openSideBar,setOpenSideBar}}>
    {children}
    </LoadingContext.Provider>
  )
}

export default LoadingContextProvider;