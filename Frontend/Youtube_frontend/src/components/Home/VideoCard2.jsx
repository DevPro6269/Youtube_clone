import React from 'react'
import { Link } from 'react-router-dom';
import timeAgo from '../../Helper/CalculateTime';
const VideoCard2 = ({video}) => {

  
  return (
    <div className="flex w-[100%]  h-[100%] justify-center relative flex-col gap-2 md:gap-4">
         <Link to={`/youtube/video/${video._id}`}>
         <div className="   overflow-hidden  rounded-md w-[100%]">
            <img
              className="  h-full overflow-hidden rounded-md w-full"
              src={video.thumbnailUrl}
              alt=""
            />
          </div>
         </Link>



          <div className="flex w-[100%]  gap-2">

           <Link to={`/channel/${video.publishedBy._id}`} >
           <div className="md:h-10  h-7 w-7 md:w-10 p-[2px] self-start  rounded-full">
              <img src={video.publishedBy.profile} className='h-full w-full object-cover rounded-full' alt="" />
            </div>
           </Link>

            <div className="w-[70%]">
             <div className="flex flex-col">
             <p className=" text-ellipsis text-white text-[10px] sm:text-sm md:text-base  w-full line-clamp-2">
              {video.title}
              </p>
              <p className="text-gray-600 sm:text-sm md:text-base text-[12px]">{video.publishedBy.channelName}</p>
              <p className="text-gray-500 sm:text-xs md:text-sm text-[10px] ">{video.views} views {timeAgo(video.createdAt)}</p>
             </div>
            </div>
            
            <div className=" text-white w-[15%] self-start">
            <i className="fa-solid fa-lg fa-ellipsis-vertical"></i>
            </div>

          </div>



        </div>

  

  )
}

export default VideoCard2