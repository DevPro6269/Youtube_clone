import React, { useEffect, useState } from 'react'
import useApiRequest from "../Hooks/useApiRequest.js"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../Store/userSlice.js'
import { toast } from 'react-toastify';


const Login = () => {
   const dispatch = useDispatch()
    const navigate = useNavigate()

 const url = "https://youtube-clone-4vf7.onrender.com/api/user/login"

 const[formData,setFormData]=useState({
    email:"",
    password:""
 })
 const[triggerRequest,settriggerRequest] = useState(false);  

const {data,loading,error}=useApiRequest(url,triggerRequest,"POST",formData)

 useEffect(()=>{
    if(data.statusCode==200){  
        console.log(data);
              
        dispatch(setLoggedIn(data.data))
        navigate("/")
        toast.success(`Login successful! Welcome!`); // Success toast
    }
    console.log(triggerRequest)
 },[data,triggerRequest])

function handleSubmit(e){
    e.preventDefault();
    console.log(formData);
   
    if (!formData.email || !formData.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
        return alert("Please enter a valid email.");
      }
      if (!formData.password || formData.password.length < 6) {
        return alert("Password must be at least 6 characters.");
      }
  


    settriggerRequest(true)
    
}
function handleChange(e){
    const{value,name}=e.target;
    setFormData((prev)=>{
        return {
            ...prev,[name]:value
        }
    })
}

 
  return (

<section className="w-full flex justify-center items-center h-screen px-4 lg:w-[81%] bg-gray-900">
  <div className="flex w-full max-w-4xl p-6 mx-auto bg-white shadow-lg rounded-xl">
    
    {/* Image Section - Hidden on mobile */}
    <div className="hidden md:w-1/2 sm:flex justify-center mb-6 md:mb-0">
      <img 
        src="https://res.cloudinary.com/dqlryem36/image/upload/v1740373812/account_2_yk1t1f.png" 
        alt="Login illustration" 
        className="w-full max-w-[400px] h-auto"
      />
    </div>

    {/* Login Form */}
    <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex flex-col gap-6 px-6 py-4">
      
      {/* Form Header */}
      <div className="self-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-500">Please login to continue.</p>
      </div>

      {/* Email Input */}
      <div>
        <input 
          type="email"
          onChange={handleChange}
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Input */}
      <div>
        <input 
          type="password"
          onChange={handleChange}
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-2">{error.message}</p>}

      {/* Login Button */}
      <div className="flex justify-center">
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </div>

      {/* Forgot Password & Sign Up Link */}
      <div className="flex justify-between text-sm text-gray-600">
        <a href="#" className="text-blue-300 hover:text-blue-600">Forgot password?</a>
        <a href="#" className="text-blue-300 hover:text-blue-600">Sign up</a>
      </div>
    </form>
  </div>
</section>



  )
}

export default Login