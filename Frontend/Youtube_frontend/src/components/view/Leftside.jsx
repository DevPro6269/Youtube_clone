import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useApiRequest from '../../Hooks/useApiRequest';
import { toast } from 'react-toastify';
import ReviewCard from './ReviewCard';

const Leftside = ({video}) => {
  const[message,setMessage]=useState("")
  const[comments,setComments]=useState([])
  const[isSubscribed,setIsSubscribed]=useState(false)
  const url = `http://localhost:8000/api/like/${video._id}`
  const[isLikedByMe,setIsLikedByMe]=useState(false)
  const user = useSelector((state)=>state.user.user)
  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn)
  const[triggerRequest,settriggerRequest] = useState(false)
  const[likes,setLikes]=useState(0)
  
  
  const{data,loading,error} = useApiRequest(url,triggerRequest,isLikedByMe?"DELETE":"POST")
  
useEffect(()=>{
if(video.publishedBy){ 
  const subscribeUrl = `http://localhost:8000/api/subscribe/${video.publishedBy}`
  
  async function fetchData(){
    try {
      const response = await axios.get(subscribeUrl,{withCredentials:true})
      if((response && response.data)){
        console.log(response.data)
      }
    } catch (error) {
       console.log(error);  
    }
  }
  fetchData()
}
  
},[video])


  useEffect(()=>{
   if(video._id){
    
    
     const url = `http://localhost:8000/api/like/${video._id}`
     async function fetchData(){
      try {
        const response = await axios.get(url,{withCredentials:true})
        if((response && response.data)){
          console.log(response.data);
          setIsLikedByMe(response.data.data.hasLiked);
        }
      } catch (error) {
         console.log(error);  
      }
    }
    fetchData()
   }
   setComments(video.comments)
    
   setLikes(video.likes)
    if(error){
      console.log(error)
      return
    }

   if(data && data.data){
    console.log(data)
    setLikes(data.data.likes)
  }
  settriggerRequest(false)
  },[data,error,video])

 function handleClick(){
     if(isLoggedIn){
      console.log("yes");
      settriggerRequest(true)  
     }  else{
      toast.error("Please Login first")
     }
  }

 async function handleCommentClick(e){
  e.preventDefault()

console.log(video);

   if(!message){
    return
   }

    if(isLoggedIn){

      try {
        const response = await axios.post(`http://localhost:8000/api/comment/${video._id}`,{message},{
          withCredentials:true
        })
 
        if(response && response.data){
         if(response.data.statusCode==201){
          setComments((prev)=>{
            return [...prev,response.data.data]
          })
            toast.success("comment added successfully")
            setMessage("")
         }
         
        }
        
      } catch (error) {
       console.log(error);
      }


    }
  }

  async function handleDeleteComment(e,comment){
    e.preventDefault()
   try {
    const url = `http://localhost:8000/api/comment/${ comment&& comment._id}`
    const response = await axios.delete(url,{withCredentials:true})
    if(response && response.data.statusCode==200){
    const res =   comments.filter((c)=>c._id!==comment._id)
    setComments(res)
    toast.success("comment deleted successfully")
    }
   } catch (error) {
    console.log(error);
    
   }
  
  }


  return (
    <div className='w-[70%] h-screen gap-6 flex flex-col'>


    <section className='w-[100%]  h-[70%] p-1 mx-auto'>
    <video 
  className="h-full rounded-2xl object-cover w-full max-w-full" 
  src={video&&video.videoUrl} 
  controls
  loop
  autoPlay
  poster="https://example.com/your-thumbnail-image.jpg" // Optional: If you want to show a thumbnail before the video starts
>
  Your browser does not support the video tag.
</video>
    </section>

    <section className='w-[75%]'>
        <h1 className='text-xl overflow-hidden p-2 whitespace-nowrap text-ellipsis'>{video&&video.title}</h1>
    </section>

     <section className='flex justify-between'>
          <div className='flex gap-3 items-center '>
             <div className='h-12 w-12 rounded-full bg-amber-300'>
              <img src={video && video.Channel?.length==1 && video.Channel[0].profile} className='h-full rounded-full w-full' alt="" />
             </div>
             <div className='flex flex-col'>
              <h1 className='text-xl'>{video && video.Channel?.length==1 && video.Channel[0].channelName}</h1>
              <p className='text-gray-500'>57.4k subscribers</p>
             </div>
             <div onClick={()=>setIsSubscribed((prev)=>!prev)}>
              {
                isSubscribed?  <button className='p-2 rounded-full bg-zinc-700 px-4'><i class="fa-regular fa-bell"></i>  Subscribed</button>:
                <button className='p-2 rounded-full bg-white text-black'>Subscribe</button>
              }
             </div>
          </div>

           {/* chaneel and video info bar */}
          <div className='flex items-center gap-2'>

            <div className=' bg-zinc-800 rounded-full flex'>
           <div onClick={handleClick} className='p-2 flex items-center gap-1 hover:bg-zinc-500 rounded-l-full'>
          {
            isLikedByMe?<i class="fa-solid  fa-thumbs-up p-1"></i>:<i class="fa-regular  fa-thumbs-up p-1"></i>
          }
            
          
           <p className=''>{likes}</p>
           </div>


           <div className='w-[2px] h-12 bg-gray-700'></div>
           <div className=' px-4 flex items-center gap-1 hover:bg-zinc-500 rounded-r-full'>
           <i class="fa-regular  fa-thumbs-down"></i>
           </div>
            </div>




            <div className='flex items-center hover:bg-zinc-600 h-11 rounded-3xl gap-2 bg-zinc-800  px-3'>
            <i class="fa-solid fa-share"></i>
          <h1>Share</h1>
            </div>

            <div className='flex items-center h-11 hover:bg-zinc-600 rounded-3xl gap-2 bg-zinc-800  px-3'>
            <i class="fa-solid fa-download"></i>
          <h1>Download</h1>
            </div>


            <div className='flex items-center h-10 w-10 hover:bg-zinc-600 justify-center rounded-full gap-2 bg-zinc-800  p-2'>
            <i class="fa-solid fa-ellipsis"></i>  
            </div>
          </div>

         
     </section>



 {/* section for description box */}
         <section className='bg-zinc-800 flex flex-col rounded-2xl p-5'>
          <p>9,891,703 views  14 Feb 2023  #ShapeofYou #EdSheeran #ShapeofYoulyrics</p>
          <p>Baby It's You - Revel Day (Lyrics)   </p>
          <p className='w-[80%]'>Veer & Zaara's love was eternal and Zaara could feel his presence even when he wasn’t around! Enjoy the track ‘Main Yahaan Hoon’ from Veer-Zaara!
          </p>
          </section>

          {/* /////// */}

{/* section for comment  and review */}
          <section  >
              <div className='flex gap-12'>
              <div className='p-4'>
              <h1 className='text-xl'>65,318 Comments</h1>
              </div>

              <div className='flex gap-4 items-center'>
              <i class="fa-solid fa-lg fa-sort"></i>
                <p>Sort</p>
              </div>
              </div>
             
              {/* input div add new comment */}
              <div className={`flex ${isLoggedIn?"block":"hidden"} items-center gap-3`}>
                <div className='h-10 w-10  rounded-full'>
                  <img src={ user && user.profile} className='h-full w-full object-cover' alt="" />
                </div>

                <form action="" onSubmit={handleCommentClick} className='w-full flex gap-2 flex-col'>
                <div className='w-[100%]'>
                  <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className='outline-none w-full border-b' placeholder='add comment' />
                </div>
                <div className='flex gap-5 self-end'>
                   <button className='p-2 hover:bg-gray-700 px-3 rounded-3xl'>cancel</button>
                   <button onClick={handleCommentClick} className='p-2 bg-gray-700 px-4 rounded-2xl'>comment</button>
                </div>
                </form>
              </div>
          </section>


{/* section for showing comments */}
  
  <section className='flex flex-col gap-8'>
   {
    comments && comments.map((comment,index)=>{
      return <ReviewCard fn={(e)=>handleDeleteComment(e,comment)}  key={index} comment={comment} />
    })
   }

  </section>

    </div>
  )
}

export default Leftside