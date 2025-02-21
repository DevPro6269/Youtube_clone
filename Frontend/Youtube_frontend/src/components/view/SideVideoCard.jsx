import React from 'react'

const SideVideoCard = ({src,title,channelName,views}) => {
  return (
    <div className='flex'>
    <div  className='bg-black p-1 w-[40%] '>
       <img className='w-full h-full rounded-md' src={src} alt="" />
    </div>

    <div className=' flex w-[60%] h-28'>
       <div className='flex flex-col gap-1'>
           <h1 className='line-clamp-2'>
          {title}
           </h1>
           <p className='text-gray-400'>{channelName}</p>

           <p className='text-gray-400'>{views}</p>
       </div>

       <div className='p-2'>
       <i className="fa-solid fa-lg fa-ellipsis-vertical"></i>
       </div>
    </div>
</div>
  )
}

export default SideVideoCard