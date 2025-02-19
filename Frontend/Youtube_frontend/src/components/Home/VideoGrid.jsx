import React, { useEffect, useState } from "react";
import VideoCard2 from "./VideoCard2";
import axios from "axios";
import useApiRequest from "../../Hooks/useApiRequest";
import CategoryBar from "./CategoryBar";

export const VideoGrid = () => {
  const url = "http://localhost:8000/api/video";
  const [videos, setVideos] = useState([]);


const{loading,data,error} = useApiRequest(url,true)

useEffect(()=>{
  //  console.log(data)
},[data])


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
    <>
      <section className=" bg-black gap-6 p-2 h-screen flex flex-col overflow-auto  w-[82%] ">
        <CategoryBar/>
        <div className="flex gap-5 flex-wrap">
          {videos.map((video, index) => (
            // Ensure to return the VideoCard2 component with necessary props
            <VideoCard2 key={index} video={video} />
          ))}
        </div>
      </section>
    </>
  );
};
