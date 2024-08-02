import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoadingContextProvider from './Context/LoadingContextProvider.jsx'
import UserContextProvider from './Context/UserContextProvider.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <LoadingContextProvider>
   
       <App/>
    
  </LoadingContextProvider>
  </React.StrictMode>,
)
