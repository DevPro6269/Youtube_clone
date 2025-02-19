import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { VideoGrid } from '../components/Home/VideoGrid'
import Signup from './Signup'
import Login from './Login'
import Profile from '../components/Profile'
import { CreateChannel } from './CreateChannel'
import CategoryBar from '../components/Home/CategoryBar'

const Home = () => {
  return (
   <> 
   {/* <div className=' border-4 border-red-400 bg-blue-500 flex flex-col'> */}
    {/* <CategoryBar/> */}
   <VideoGrid/>
   {/* </div> */}
   </>
  )
}

export default Home