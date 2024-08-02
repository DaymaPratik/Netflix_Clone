const api_key='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzcyMGM3OWQ1MGVhOTZmNjQ4NmI0OTA1OTAzN2VlZSIsIm5iZiI6MTcyMjQ0NjY0Ny41MTA1ODksInN1YiI6IjY2YWE2YWU4M2VmNzJmZWNmMDUwNTdhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.16AEXRfwKpHI4Efy101Iru7z72Hie1cxVy4YfSJoVws';

  const fetchFromTMDB=async(url)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ api_key
        }
      };
   
        const res=await fetch(url,options)
        const data=await res.json();
        // console.log("TMDB FUNCTION DATA",data);
        if(res.status!==200){
        console.log("TMDB FUNCTION ERROR ");
        }
         return data; 
    
  }
  module.exports=fetchFromTMDB;