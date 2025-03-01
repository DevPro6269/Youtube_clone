import React from 'react'
import { VideoGrid } from '../components/Home/VideoGrid'


const Home = ({searchQuery}) => {
  
  return (
   <> 
   {/* <div className=' border-4 border-red-400 bg-blue-500 flex flex-col'> */}
    {/* <CategoryBar/> */}
   <VideoGrid searchQuery={searchQuery} /> 
   {/* </div> */}
   </>
  )
}

export default Home