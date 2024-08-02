import { BrowserRouter,Routes,Route } from "react-router-dom";
import Authentication from './Pages/AuthPage/Authentication.jsx';
import BrowsePage from "./Pages/Browse/BrowsePage.jsx";
import MoviesPage from "./Pages/MoviesPage/MoviesPage.jsx";
import TvsPage from "./Pages/TvsPage/TvsPage.jsx";
import MyListPage from "./Pages/MyListPage/MyListPage.jsx";
import HistoryPage from "./Pages/HistoryPage/HistoryPage.jsx";
import DetailsPageMovie from "./Pages/DetailsPageMovie/DetailsPageMovie.jsx";
import DetailsPageTvs from "./Pages/DetailsPageTvs/DetailsPageTvs.jsx";
import SearchPage from "./Pages/SearchPage/SearchPage.jsx";
import UserContextProvider from "./Context/UserContextProvider.jsx";
import PlayListContextProvider from "./Context/PlayListContextProvider.jsx";

function App() {
 

  return (
   
      <BrowserRouter>
       <UserContextProvider>
   <PlayListContextProvider>
   <Routes>
     <Route path="/" element={<Authentication/>}/>
     <Route path="/browse" element={<BrowsePage/>}/>
     <Route path="/tvspage" element={<TvsPage/>}/>
     <Route path="/movies" element={<MoviesPage/>}/>
     <Route path="/search" element={<SearchPage/>}/>
     <Route path="/history" element={<HistoryPage/>}/>
     <Route path="/movie/details/:id" element={<DetailsPageMovie/>}/>
     <Route path="/tv/details/:id" element={<DetailsPageTvs/>}/>
    </Routes>
   </PlayListContextProvider>
    </UserContextProvider>
    </BrowserRouter>
    
  )
}

export default App
