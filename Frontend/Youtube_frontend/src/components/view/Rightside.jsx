import React,{useState,useEffect} from "react";
import SideVideoCard from "./SideVideoCard";
import axios from "axios";
import { Link } from "react-router-dom";
const Rightside = () => {

  const url = "http://localhost:8000/api/video";
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
  }, []);


  


  return (
    <div className="w-[30%] h-auto bg-black text-white">
      <div className="flex flex-col gap-2 p-1">

{

videos && videos.map((video,index)=>{
  return  <Link key={index} to={`/youtube/video/${video._id}`}>
   <SideVideoCard
  key={index}
  src={video.thumbnailUrl}
  title={video.title}
  channelName={"Times music"}
  views={"110M views : 1 year ago"}
/>
  </Link>
})

}
       
      </div>
    </div>
  );
};

export default Rightside;
