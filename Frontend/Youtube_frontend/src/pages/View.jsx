import React, { useEffect, useState } from 'react'
import Leftside from '../components/view/Leftside'
import Rightside from '../components/view/Rightside'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from "../components/Navbar"
import useApiRequest from '../Hooks/useApiRequest'
import Sidebar from "../components/Sidebar"





const View = () => {
  const[loading ,setLoading]=useState(false)
const[video,setVideo]=useState({})
const {videoId} = useParams()
const url = `http://localhost:8000/api/video/${videoId}`
const [isSideBarOpen,setIsSideBarOpen]=useState(false)

// const{data,loading,error} = useApiRequest(url,true)

// useEffect(()=>{
//   if(data.data){
//    setVideo(data.data[0])
//   }
// },[data])

useEffect(()=>{
  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(url);

      if (response && response.data) {
        setVideo(response.data.data[0]);
        console.log(response.data);
        
        // setVideos(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };
   if(videoId){
     fetchVideos();
   }
},[url])

function handleClick(){
   setIsSideBarOpen((prev)=>!prev)
}


  return (
   <>
   
   <Navbar handleClick={handleClick} />
   <div className='p-2 flex bg-black text-white'>
   {isSideBarOpen && <Sidebar position='absolute' />}
   <Leftside video={video} />
   <Rightside/>
   </div>
   </>
  )
}

export default View