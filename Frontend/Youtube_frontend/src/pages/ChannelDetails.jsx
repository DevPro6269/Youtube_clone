import React, { useEffect, useState } from 'react'
import VideoCard from '../components/Channel/VideoCard'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {toast} from "react-toastify"

const ChannelDetails = () => {
  const[videos,setVideos] = useState([])
  const [channel,setChannel]= useState(null)
  const {channelId}= useParams()
   const url = `http://localhost:8000/api/channel/${channelId}`
    const user = useSelector((state)=>state.user.user);

     const owner = channel?.owner.toString() ===  user && user._id.toString()
      
  useEffect(()=>{
   async function fetchData(){
    const response =   await axios.get(url,{withCredentials:true})

      if(response && response.data){
        console.log(response.data.data[0]);
        setChannel(response.data.data[0])
        setVideos(response.data.data[0].ChannelVideos )
      }
    }
    fetchData()
  },[])


  async function handleDeleteVideo(e,video){
    
    e.preventDefault()
    

   try {
    const url = `http://localhost:8000/api/video/${ video && video._id}`
    console.log(url);
    
    const response = await axios.delete(url,{withCredentials:true})
    if(response && response.data.statusCode==200){
    const res =   videos.filter((c)=>c._id!==video._id)
    setVideos(res)
    toast.success("Video deleted successfully")
    }
   } catch (error) {
    console.log(error);
    
   }
  
  }


  return (
   <>
   <div className='w-[82%] p-2 flex gap-4 flex-col text-white bg-black h-screen'>
     
    <section className=' w-[95%] h-[22%] flex '>
           <div className='w-full h-full rounded-2xl  bg-zinc-600'>
            <img className='h-full w-full rounded-2xl' src="https://yt3.googleusercontent.com/t8Npp2r-fLu6dqvEMItpuvzBy-zkFQr7j69bcMB3gGvc4ogdhs-8dZ9O46iMmPHdka_Bs2i77HY=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="" />
           </div>
    </section>


      <section className=' h-[21%] w-[90%] flex gap-2 '>
        <div className=' h-full w-[16%] rounded-full '>
        <img src={channel && channel.profile}
        className='w-full h-full rounded-full object-cover'
        alt="" />
        </div>
        <div className='flex flex-col gap-2'>
             <h1 className='text-3xl'>{channel && channel.channelName}</h1>
             <h1>@devabhai11m . <span className='text-gray-400'>6.3M Subscribers . {videos.length} Videos</span></h1>
              <p>{channel && channel.description }
              </p>
              <button className={`p-2 rounded-4xl ${owner?"hidden":"block"} bg-white text-black w-32`}>Subscribe</button>
              <div className={`${owner?"block":"hidden"}  flex gap-4`} >
              <button className='p-2 px-4 rounded-4xl  bg-zinc-700 hover:bg-zinc-600 '>Manage Videos</button>
              <button className='p-2 px-4 rounded-4xl bg-zinc-700 hover:bg-zinc-600 '>Customize channel</button>
              </div>
        </div>
      </section>

      <section className=' border-b-[1px] border-b-zinc-700 flex px-5 gap-8 '>
        <h1 className=' hover:border-b-2 py-2 font-semibold'>Home</h1>
        <h1 className=' border-b-2 py-2 font-semibold'>Videos</h1>
        <h1 className=' hover:border-b-2 py-2 font-semibold'>Shorts</h1>
        <h1 className=' hover:border-b-2 py-2 font-semibold'>Playlist</h1>
      </section>

      {/* <div className='h-[1px] w-full bg-zinc-600'></div> */}

         <section className=' flex  px-8 gap-3 flex-col'>
            <div className='flex gap-2'>
                <button className='bg-white text-black rounded-md px-4 p-[5px]'>Latest</button>
                <button className='bg-zinc-700 rounded-md px-4 p-[5px]'>Popular</button>
                <button className='bg-zinc-700 rounded-md px-4 p-[5px]'>Oldest</button>
            </div>

     <div className='flex gap-8 flex-wrap p-2'>
     { 
    videos &&  videos.map((video,index)=>{
        return <VideoCard fn={(e)=>handleDeleteVideo(e,video)} key={index} video={video} />
      })
     }
     </div>


         </section>

   </div>
   </>
  )
}

export default ChannelDetails