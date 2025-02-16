import React from 'react'

const VideoCard = () => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='h-40 w-60  bg-amber-300 rounded-lg'>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbaLaKTpZz8XbsJc2J5C00leUHG57ofSVa0g6ntU0KthVsAX1YhaAGYn_eUFjhofdIGLE&usqp=CAU" className='h-full w-full rounded-lg object-cover' alt="" />
        </div>

        <div className='flex gap-6'>
            <div className=''>
             <p className='line-clamp-2 w-52'>The relatable reason Renée Zellweger was picked to play Bridget Jones | Capital
             </p>
             <p className='text-gray-600'>
                1.8k views . 2 days ago
             </p>
            </div>

            <div className='mt-2'>
            <i class="fa-solid fa-lg fa-ellipsis-vertical"></i>
            </div>
        </div>
    </div>
  )
}

export default VideoCard