import React,{useState,useEffect} from "react";
import SideVideoCard from "./SideVideoCard";
import axios from "axios";
import CalculateTime from "../../Helper/CalculateTime.js"
import { Link } from "react-router-dom";
const Rightside = () => {

  const url = "https://youtube-clone-4vf7.onrender.com/api/video";
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(url);

        if (response && response.data) {
          // console.log(response.data);
        
          
          setVideos(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, [videos]);


  


  return (
    <div className="md:w-[30%] flex-1 w-[100%] h-auto bg-black text-white">
      <div className="flex flex-col gap-2 p-1">

{

videos && videos.map((video,index)=>{
  return  <Link key={index} to={`/youtube/video/${video._id}`}>
   <SideVideoCard
  key={index}
  src={video.thumbnailUrl}
  title={video.title}
  channelName={video.publishedBy.channelName}
  views={`${ video.views} views . ${CalculateTime(video.createdAt)}`}
/>
  </Link>
})

}
       
      </div>
    </div>
  );
};

export default Rightside;
