import { useContext, useState } from "react";
import Register from "../../Components/Register/Register";
import Login from "../../Components/Login/Login";
import { UserContext } from "../../Context/UserContextProvider";;
import 'react-toastify/dist/ReactToastify.css';

function Authentication() {
  const [alreadyNotLogin,setAlreadyNotLogin]=useState(false);
  const {userDetails,setUserDetails}=useContext(UserContext);
  
  const handleChangeFunction=(e)=>{
    const {name,value}=e.target;
    setUserDetails({
        ...userDetails,
        [name]:value,
    })
}


  return (
    <main className="h-fit min-h-screen  border-2 border-black bg-center bg-no-repeat bg-cover
    bg-[url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1280,h_720,q_75,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs')] ">
      
        <section className="bg-[#00000099] h-full w-full">
        <nav className="flex items-center py-2 w-full justify-between px-[20px] min-[768px]:px-[100px]">
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
                alt="netflix-logo"className="h-[50px]"/>
            </div>
            <div>
                  <button className="bg-[#ff0000] text-white px-3 font-bold py-1 text-[25px] rounded-sm hover:bg-transparent hover:text-[#ff0000] border-2 border-[#ff0000] transtition ease-in duration-150" onClick={()=>{setAlreadyNotLogin(!alreadyNotLogin)}}>
                  {alreadyNotLogin ? "Login" : "Register"}
                  </button>
                  
            </div>
        </nav>

        <div className="login-signup-container py-[100px] h-fit min-h-[90vh]  flex justify-center items-center">
          {
            alreadyNotLogin
            ?
            <Register  setAlreadyNotLogin={setAlreadyNotLogin} alreadyNotLogin={alreadyNotLogin}  handleChangeFunction={handleChangeFunction}/>
            :
            <Login  setAlreadyNotLogin={setAlreadyNotLogin} alreadyNotLogin={alreadyNotLogin}  handleChangeFunction={handleChangeFunction}/>
          }
        </div>
        </section>
    </main>
  )
}

export default Authentication