import React, { useEffect, useState } from 'react'
import useApiRequest from "../Hooks/useApiRequest.js"
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

 const url = "http://localhost:8000/api/user/login"

 const[formData,setFormData]=useState({
    email:"",
    password:""
 })
 const[triggerRequest,settriggerRequest] = useState(false);  

const {data,loading,error}=useApiRequest(url,triggerRequest,"POST",formData)

 useEffect(()=>{
    if(data.statusCode==200){
        navigate("/")
    }
 },[data])

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
    <section className='w-[82%] flex justify-center pb-20 items-center h-screen '>
        
        <div className='flex bg-white'>
       <form action="" onSubmit={handleSubmit} className='bg-white p-4  w-[50%]  flex items-center flex-col gap-8'>
   
   <div className='self-center'>
    <h1 className='text-3xl'>Log in</h1>
   </div>

       <div>
      
       <input type="email" onChange={handleChange} id='email' name='email' placeholder='email' className='border-b w-66 outline-none' />
       </div>

       <div>
       
       <input type="password" onChange={handleChange} placeholder='password' name="password" className='border-b w-66 outline-none' id='Password' />
       </div>

        <div className='w-full justify-center flex'>
            <button disabled={loading} className='p-2 font-semibold w-[70%] border bg-blue-500 hover:bg-blue-400 text-white rounded-md'>Log in</button>
        </div>
        {
            error?<p className='text-red-600'>{error.message}</p>:""
        }

       <div>
        <p>Create a new account ? <a className='text-blue-500' href="">Sign up</a> </p>
       </div>

       </form>

<div className='w-[50%]'>
    <img src="https://res.cloudinary.com/dqlryem36/image/upload/v1739621912/search_x7gcgt.png" alt="" />
</div>

        </div>

    
   </section>
  )
}

export default Login