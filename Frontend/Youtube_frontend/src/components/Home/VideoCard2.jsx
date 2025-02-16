import React from 'react'

const VideoCard2 = ({thumbnail,title,channel,views,channelProfile}) => {
  return (
    <div className="flex flex-col gap-2">
          <div className="h-52 w-84">
            <img
              className=" h-full w-full"
              src={thumbnail}
              alt=""
            />
          </div>


          <div className="flex w-84 items-center gap-2">

            <div className="h-12 w-[15%] self-start bg-yellow-400 rounded-full">
              <img src={channelProfile} className='h-full w-full object-cover rounded-full' alt="" />
            </div>

            <div className="w-[70%]">
             <div className="flex flex-col">
             <p className=" text-ellipsis text-white  w-full line-clamp-2">
              {title}
              </p>
              <p className="text-gray-600">{channel}</p>
              <p className="text-gray-600">{views}</p>
             </div>
            </div>
            
            <div className=" text-white w-[15%] self-start">
            <i class="fa-solid fa-lg fa-ellipsis-vertical"></i>
            </div>

          </div>
        </div>
  )
}

export default VideoCard2