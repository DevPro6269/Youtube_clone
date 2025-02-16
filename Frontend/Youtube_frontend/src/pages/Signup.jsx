import React from 'react'
import { Link } from "react-router-dom"
const Signup = () => {
  return (
   <section className='w-[82%] flex justify-center pb-20 items-center h-screen '>
        
        <div className='flex bg-white'>
<div className='w-[50%]'>
    <img src="https://res.cloudinary.com/dqlryem36/image/upload/v1739619803/development_nfbbl3.png" alt="" />
</div>

       <form action="" className='bg-white p-4  w-[50%]  flex items-center flex-col gap-8'>
   
   <div className='self-center'>
    <h1 className='text-3xl'>Sign Up</h1>
   </div>

       <div>
       <input type="text" placeholder='first name ' className='border-b w-66 outline-none ' id='firstName'/>
       </div>

       <div>
     
       <input type="text" id='lastName' placeholder='last name' className='border-b w-66 outline-none' />
       </div>


       <div>
      
       <input type="email" id='email' placeholder='email' className='border-b w-66 outline-none' />
       </div>

       <div>
       
       <input type="password" placeholder='password' className='border-b w-66 outline-none' id='Password' />
       </div>

        <div className='w-full justify-center flex'>
            <button className='p-2 font-semibold w-[70%] border bg-blue-500 hover:bg-blue-400 text-white rounded-md'>Sign up</button>
        </div>


       <div>
        <p>Already have an account ? <a className='text-blue-500' href="">Login</a> </p>
       </div>

       </form>
        </div>

    
   </section>
  )
}

export default Signup