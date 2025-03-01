import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'

const VideoCard = ({video,fn,owner}) => {
const navigate = useNavigate()
const[isEditable,setIsEditable]=useState(false)
const {isLoggedIn,user} = useSelector((state)=>state.user)
let isOwner ;

if(isLoggedIn){
  // console.log(video,user);
  isOwner = video.publishedBy == user.channel._id
 }

function handleEditClick(e){
  if(!isOwner){
    toast.error("you are not authorized to this process")
    return
  }
  navigate(`/video/edit/${video._id}`)

  e.stopPropagation();

}

function handleDelete(e){
  if(!isOwner){
    toast.error("you are not authorized to this process")
    return
  }
  fn(e)
  e.stopPropagation();

}


  return (
    <div className='flex  flex-col gap-2'>
      
       <div className='md:h-40 md:w-60 relative  h-20 w-40   bg-amber-300 rounded-lg'>
       <Link to={`/youtube/video/${video._id}`} >
         <img src={video && video.thumbnailUrl} className='h-full w-full rounded-lg ' alt="" />
         </Link>
         <div  className={` p-1 absolute w-full ${owner?"block":"hidden"} flex justify-between z-10 right-0 bottom-0 `}>

       <div onClick={(e)=>handleEditClick(e)} className='rounded-full p-2 bg-zinc-700'>
       <i class="fa-solid fa-pen"></i>
       </div>
        <div onClick={(e)=>handleDelete(e)} className='rounded-full p-2 bg-zinc-700'>
        <i class="fa-solid fa-trash"></i>
        </div>
       </div>
        </div>
       
       

        <div className='flex  md:gap-6'>
            <div className=''>
             <p className='line-clamp-2  text-xs  w-32 md:w-52'>{video.title}
             </p>
             <p className='text-gray-600 md:text-base text-xs'>
                1.8k views . 2 days ago
             </p>
            </div>

            <div  className='mt-2'>
            <i className="fa-solid fa-lg fa-ellipsis-vertical"></i>
            </div>
        </div>

      

    </div>
  )
}

export default VideoCard