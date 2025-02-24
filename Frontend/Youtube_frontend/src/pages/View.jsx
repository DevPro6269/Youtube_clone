import React, { useEffect, useState } from 'react'
import Leftside from '../components/view/Leftside'
import Rightside from '../components/view/Rightside'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from "../components/Navbar"
import useApiRequest from '../Hooks/useApiRequest'
import Sidebar from "../components/Sidebar"
import { useDispatch } from 'react-redux'
import { setHamburgerMenu } from '../Store/hamburgerMenuSlice'

const View = () => {
  const[loading ,setLoading]=useState(false)
const[video,setVideo]=useState({})
const {videoId} = useParams()
const url = `https://youtube-clone-4vf7.onrender.com/api/video/${videoId}`
const [isSideBarOpen,setIsSideBarOpen]=useState(false)
const dispatch = useDispatch();

useEffect(()=>{
  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(url);

      if (response && response.data) {
        setVideo(response.data.data[0]);
        console.log(response.data);
       
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
   dispatch(setHamburgerMenu())
}


// useEffect(()=>{
//   if(isSideBarOpen){
//     dispatch(setHamburgerMenu())
//   }
// },[setIsSideBarOpen])




  return (
   <>
   
   <Navbar handleClick={handleClick} />
   <div className='p-2 flex flex-col md:flex-row bg-black text-white'>
   {isSideBarOpen && <Sidebar position='absolute' />}
   <Leftside video={video} /> 
   <hr />
   <Rightside/>
   </div>
   </>
  )
}

export default View