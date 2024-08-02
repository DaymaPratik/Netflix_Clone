import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContextProvider";

function Login({handleChangeFunction,setAlreadyNotLogin,alreadyNotLogin}) {
  const {userDetails,setUserDetails}=useContext(UserContext);
    const [allRequired,setAllRequired]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const [inValidPass,setInValidPass]=useState(false);
    const [inValidEmail,setInValidEmail]=useState(false);
    const navigate=useNavigate();
    const loginUserFunction=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch('http://localhost:10000/api/login',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify(userDetails)
            })
            const data=await response.json();
            console.log(data);
            if(data.message==="User does not exists with the given email"){
                setInValidEmail(true);
                setAllRequired(false);
                setInValidPass(false);
                return;
            }if(data.message==="Enter correct Password"){
                setInValidEmail(false);
                setAllRequired(false);
                setInValidPass(true);
                return;
            }
            if(data.message==="All feilds are required"){
                setInValidEmail(false);
                setAllRequired(true);
                setInValidPass(false);
                return;
            }
            setUserDetails(data.userObj);
            navigate('/browse');
            
            
        } catch (error) {
            console.log("ERROR WHILE LOGIN USER FRONTEND",error);
        }
    }
  return (
    <form className="bg-[rgba(1,1,1,0.15)] 
    text-white p-8 rounded-lg shadow-[0px_0px_10px_0px_red] px-4 min-[400px]:px-10 
    mx-auto max-w-[300px] min-[500px]:max-w-[420px] backdrop-blur-[7px]">
      <h2 className="text-2xl font-bold mb-6 text-center">
      Login
      </h2>
        <div className="mb-4">
          <label className="block  mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email || ""}
            onChange={handleChangeFunction}
            className="w-full px-3 py-2 border border-red-300  bg-[#93e0ff54]  rounded-lg 
          focus:outline-none focus:border-red-500 "
          />
        </div>
        {inValidEmail && (
          <p className="my-3 text-center font-bold text-[20px] text-[#ff0000]">
            This email does&#39;t exists
          </p>
        )}
        <div className="mb-6">
          <label className="block mb-2">Password</label>
          {showPassword ? (
            <div
              className="w-full border border-red-300  pr-2 flex justify-between items-center bg-[#93e0ff54] rounded-lg 
       focus:outline-none focus:border-red-500"
            >
              <input
                type="text"
                name="password"
                value={userDetails.password || ""}
                onChange={handleChangeFunction}
                className="bg-transparent h-full px-3 py-2
          focus:outline-none focus:border-red-500 max-[500px]:w-[85%]"
              />
              <FaEyeSlash
                className="text-[25px] text-red-500 "
                onClick={() => {
                  setShowPassword(false);
                }}
              />
            </div>
          ) : (
            <div
              className="w-full border border-red-300 pr-2 flex items-center justify-between bg-[#93e0ff54] rounded-lg 
          focus:outline-none focus:border-red-500"
            >
              <input
                type="password"
                name="password"
                value={userDetails.password || ""}
                onChange={handleChangeFunction}
                className="bg-transparent h-full px-3 py-2 max-[500px]:w-[85%]
          focus:outline-none focus:border-red-500 "
              />
              <FaEye
                className="text-[25px] text-red-500 "
                onClick={() => {
                  setShowPassword(true);
                }}
              />
            </div>
          )}
        </div>
        {inValidPass && (
          <p className="my-3 text-center font-bold text-[20px] text-[#ff0000]">
            Invalid Password
          </p>
        )}
        {allRequired && (
          <p className="my-3 text-center font-bold text-[20px] text-[#ff0000]">
            All fields are required
          </p>
        )}
        
        
        <button
        onClick={loginUserFunction}
          className="bg-[rgb(255,0,0)] border-2 border-red-500 transition 
          duration-150 ease-in px-3 py-1 my-3 hover:bg-transparent mx-auto text-[20px] rounded-md w-[70%] block"
        >
          Login
        </button>
        
        
           <p className="text-center text-[20px] my-3">Don&#39;t have an account ? 
            <span className="text-blue-400 cursor-pointer underline" 
            onClick={()=>{setAlreadyNotLogin(!alreadyNotLogin)}}> Sign Up</span></p>
          
      </form>
  )
}

export default Login