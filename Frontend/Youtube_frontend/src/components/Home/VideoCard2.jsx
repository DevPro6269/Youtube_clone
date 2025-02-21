import React from 'react'
import { Link } from 'react-router-dom';
import timeAgo from '../../Helper/CalculateTime';
const VideoCard2 = ({video}) => {

  
  return (
    <div className="flex relative flex-col gap-2">
         <Link to={`/youtube/video/${video._id}`}>
         <div className="h-52 w-84">
            <img
              className=" object-cover h-full w-full"
              src={video.thumbnailUrl}
              alt=""
            />
          </div>
         </Link>



          <div className="flex w-84 items-center gap-2">

           <Link to={`/channel/${video.publishedBy._id}`} >
           <div className="h-10 w-10 p-[2px] self-start  rounded-full">
              <img src={video.publishedBy.profile} className='h-full w-full object-cover rounded-full' alt="" />
            </div>
           </Link>

            <div className="w-[70%]">
             <div className="flex flex-col">
             <p className=" text-ellipsis text-white  w-full line-clamp-2">
              {video.title}
              </p>
              <p className="text-gray-600">{video.publishedBy.channelName}</p>
              <p className="text-gray-500 text-[15px]">{video.views} views {timeAgo(video.createdAt)}</p>
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