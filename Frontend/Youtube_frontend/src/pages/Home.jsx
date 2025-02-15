import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { VideoGrid } from '../components/Home/VideoGrid'

const Home = () => {
  return (
   <>
    <Navbar/>
    <div className='flex'>
    <Sidebar/>
    <VideoGrid/>
    </div>
   </>
  )
}

export default Home