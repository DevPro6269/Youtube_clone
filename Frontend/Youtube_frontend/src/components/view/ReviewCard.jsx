import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CalculateTime from "../../Helper/CalculateTime.js"
const ReviewCard = ({comment,fn}) => {

const[showMenu,setShowMenu]=useState(false)
const[isEditable,setIsEditable]=useState(false)
const {isLoggedIn,user} = useSelector((state)=>state.user)
let isOwner ;
const[message,setMessage]=useState("")

if(isLoggedIn){
 isOwner = comment.user == user._id
}

function handleEditClick(){
  if(!isLoggedIn){
    toast.error("Please login in first")
    return
  }

  if(isOwner){
   setIsEditable(true)
  }else{
    toast.error("you can not edit this")
  }
  setShowMenu(false)
  setMessage(comment.message)
}


 async function handleCommentClick(e){
  e.preventDefault()
 try {
  const url = `https://youtube-clone-4vf7.onrender.com/api/user/api/comment/${ comment&& comment._id}`
  const response = await axios.put(url,{message},{withCredentials:true})
  if(response && response.data.statusCode==200){
    setIsEditable(false)
    comment.message = message;
    setMessage("")
    toast.success("comment edited")
  }
 } catch (error) {
  console.log(error);
  
 }

}



  return (
    <div className='flex relative items-center p-2 gap-2'>
    <div className=' md:w-[6%] rounded-full'>
    <img src={comment.user[0]?.profile} className='md:w-12 w-8 h-8 md:h-12  object-cover rounded-full ' alt="" />
    </div>

    <div className='w-[75%]'>
      <p>@{comment.user[0]?.firstName} . <span className='text-gray-400'>{CalculateTime(comment.createdAt)}</span></p>
      {/* <p>{comment.message}</p> */}
      {
        isEditable?  <div className={`flex  items-center gap-3`}>
        <form action="" onSubmit={handleCommentClick} className='w-full flex gap-2 flex-col'>
        <div className='w-[100%]'>
          <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className='outline-none w-full border-b' placeholder='add comment' />
        </div>
        <div className='flex gap-5 self-end'>
           <button className='p-2 hover:bg-gray-700 px-3 rounded-3xl'>cancel</button>
           <button onClick={handleCommentClick} className='p-2 bg-gray-700 px-4 rounded-2xl'>comment</button>
        </div>
        </form>
      </div>:
      <input type="text"  value={comment.message} className='outline-none' readOnly />
      }
    </div>
    <div onClick={()=>setShowMenu((prev)=>!prev)} className='w-[15%] flex justify-end'>
    <i className="fa-solid fa-lg fa-ellipsis-vertical  hover:bg-zinc-600"></i>
    </div>

     <div  className={`bg-zinc-700 absolute ${showMenu?"block":"hidden"} right-10 `}>
         <h1 onClick={handleEditClick} className='p-2 hover:bg-zinc-600 px-7 ' >Edit</h1>
         <h1 onClick={(e)=> isOwner&&fn(e)} className='p-2 hover:bg-zinc-600 px-7 ' >Delete</h1>
     </div>

  </div>
  )
}

export default ReviewCard