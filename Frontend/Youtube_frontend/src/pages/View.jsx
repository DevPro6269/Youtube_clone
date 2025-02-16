import React from 'react'
import Leftside from '../components/view/Leftside'
import Rightside from '../components/view/Rightside'

const View = () => {
  return (
   <>
   <div className='p-2 flex bg-black text-white'>
   <Leftside/>
   <Rightside/>
   </div>
   </>
  )
}

export default View