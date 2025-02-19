import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setLoggedOut } from '../Store/userSlice';
const Profile = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const url = "http://localhost:8000/api/user/logout"  

 const userLoggedIn = useSelector((state)=>state.user.isLoggedIn);
const user = useSelector((state)=>state.user.user);
const channelId = user.channel

console.log(user);


async function handleClick(){
try {
    const response =  await axios.post(url,{},{withCredentials:true})
if(response && response.data){
    if(response.data.statusCode==200){
        alert("log out succefully")
        dispatch(setLoggedOut());
        navigate("/")
    }
    console.log(response.data);   
}
} catch (error) {
    console.log(error)
}
}




  return (
   <div className='flex  absolute right-[2px] z-20  text-white rounded-xl top-10 bg-zinc-800 flex-col' >
    

    <div className='p-3 flex gap-3'>

<div className='h-12 w-12 rounded-full bg-red-500'>
    <img src={user && user.profile} alt="" />
</div>

<div className='flex flex-col '>
    <h1>{user && user.firstName +" "+ user.lastName }</h1>
    <h2>@{ user && user.channel && user.channel.channelName}</h2>
 {
    channelId?  <Link to={`/channel/${channelId}`} > <p className='text-blue-500 mt-2'>view your channel</p></Link>:
    <Link to={"/youtube/channel/new"} > <p className='text-blue-500 mt-2'>Create your channel</p></Link>
 }
</div>
        
    </div>



    <div className=' h-[1px] bg-gray-500 my-2 w-full'></div>

   <div className='flex flex-col gap-1'>
   <div className='flex h-10 w-72  hover:bg-zinc-700 p-2 items-center gap-2'>
    <div className='p-1'>
    <i class="fa-brands fa-lg fa-google"></i>
    </div>
    <div>
    <h1 className='font-light'>Google Account</h1>
    </div>
    </div>
   <div onClick={handleClick} className='flex h-10 w-72   hover:bg-zinc-700 p-2  items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-right-from-bracket"></i>
    </div>
    <div>
    <h1 className='font-light'>Sign out</h1>
    </div>
    </div>
   
    <div className='flex h-10 w-72   hover:bg-zinc-700 p-2  items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-user-pen"></i>
    </div>
    <div>
    <h1 className='font-light'>swicth account</h1>
    </div>
    </div>
   </div>

<div className=' h-[1px] bg-gray-500 my-2 w-full'></div>

<div className='flex flex-col gap-1'>
   <div className='flex h-10 w-72  hover:bg-zinc-700 p-2 items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-chart-simple"></i>
    </div>
    <div>
    <h1 className='font-light'>Youtube Studio</h1>
    </div>
    </div>
    <div className='flex h-10 w-72   hover:bg-zinc-700 p-2  items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-dollar-sign"></i>
    </div>
    <div>
    <h1 className='font-light'>Purchase and membership</h1>
    </div>
    </div>
   </div>

   <div className=' h-[1px] bg-gray-500 my-2 w-full'></div>

   <div className='flex flex-col gap-1'>
   <div className='flex h-10 w-72  hover:bg-zinc-700 p-2 items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-shield-halved"></i>
    </div>
    <div>
    <h1 className='font-light'>Your data in youtube</h1>
    </div>
    </div>
    <div className='flex h-10 w-72   hover:bg-zinc-700 p-2  items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-key"></i>
    </div>
    <div>
    <h1 className='font-light'>Restricated Mode : Off </h1>
    </div>
    </div>

    <div className='flex h-10 w-72  hover:bg-zinc-700 p-2 items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-moon"></i>
    </div>
    <div>
    <h1 className='font-light'>Appearane: dark</h1>
    </div>
    </div>

    <div className='flex h-10 w-72  hover:bg-zinc-700 p-2 items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-earth-americas"></i>
    </div>
    <div>
    <h1 className='font-light'>Location: India</h1>
    </div>
    </div>

    <div className='flex h-10 w-72  hover:bg-zinc-700 p-2 items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-keyboard"></i>
    </div>
    <div>
    <h1 className='font-light'>Keyboard shortcuts Studio</h1>
    </div>
    </div>

    <div className=' h-[1px] bg-gray-500 my-2 w-full'></div>
  
    <div className='flex h-10 w-72  hover:bg-zinc-700 p-2 items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-gear"></i>
    </div>
    <div>
    <h1 className='font-light'> Settings</h1>
    </div>
    </div>



    <div className=' h-[1px] bg-gray-500 my-2 w-full'></div>


    <div className='flex flex-col gap-1'>
   <div className='flex h-10 w-72  hover:bg-zinc-700 p-2 items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-circle-info"></i>
    </div>
    <div>
    <h1 className='font-light'> Help</h1>
    </div>
    </div>
    <div className='flex h-10 w-72   hover:bg-zinc-700 p-2  items-center gap-2'>
    <div className='p-1'>
    <i class="fa-solid fa-message"></i> 
   </div>
    <div>
    <h1 className='font-light'>Send feedback</h1>
    </div>
    </div>
   </div>


   </div>

   </div>
  )
}

export default Profile