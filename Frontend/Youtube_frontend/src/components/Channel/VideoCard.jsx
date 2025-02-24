import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {toast} from "react-toastify"
const VideoCard = ({video,fn}) => {

  const[showMenu,setShowMenu]=useState(false)
const[isEditable,setIsEditable]=useState(false)
const {isLoggedIn,user} = useSelector((state)=>state.user)
let isOwner ;

if(isLoggedIn){
  console.log(video,user);
  isOwner = video.publishedBy == user.channel._id
 }

function handleEditClick(){
  if(!isLoggedIn){
    toast.error("Please login in first")
    return
  }
}

function handleDelete(e){
  if(!isOwner){
    toast.error("you are not authorized to this process")
    return
  }
  fn(e)
  setShowMenu(false)
}


  return (
    <div className='flex relative flex-col gap-2'>
       <Link to={`/youtube/video/${video._id}`} >
       <div className='md:h-40 md:w-60  h-20 w-40   bg-amber-300 rounded-lg'>
         <img src={video && video.thumbnailUrl} className='h-full w-full rounded-lg object-cover' alt="" />
        </div>
       </Link>

        <div className='flex  md:gap-6'>
            <div className=''>
             <p className='line-clamp-2  text-xs  w-32 md:w-52'>{video.title}
             </p>
             <p className='text-gray-600 md:text-base text-xs'>
                1.8k views . 2 days ago
             </p>
            </div>

            <div onClick={()=>setShowMenu((prev)=>!prev)} className='mt-2'>
            <i className="fa-solid fa-lg fa-ellipsis-vertical"></i>
            </div>
        </div>

        <div  className={`bg-zinc-700 absolute ${showMenu?"block":"hidden"} right-10 `}>
         <h1 onClick={handleEditClick} className='p-2 hover:bg-zinc-600 px-7 ' >Edit</h1>
         <h1 onClick={(e)=>handleDelete(e)} className='p-2 hover:bg-zinc-600 px-7 ' >Delete</h1>
     </div>

    </div>
  )
}

export default VideoCard