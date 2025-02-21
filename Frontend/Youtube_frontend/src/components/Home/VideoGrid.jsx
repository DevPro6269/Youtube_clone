import React, { useEffect, useState } from "react";
import VideoCard2 from "./VideoCard2";
import axios from "axios";
import CategoryBar from "./CategoryBar";
import Loader from "../../Loader";
import { useOutletContext } from "react-router-dom";

export const VideoGrid = () => {
  
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { searchQuery } = useOutletContext(); // Get search query from Layout
  const [activeCategory, setActiveCategory] = useState("All");
  const[sortBy,setSortBy] = useState("")
  const url = `http://localhost:8000/api/video`;
  // Fetch videos on initial load
  useEffect(() => {
  const queryParams = {
    category:activeCategory,
    title:searchQuery||undefined,
    sortBy: sortBy || undefined, 
  }
 const fetchVideos = async () => {     
      try {
        setLoading(true);
        const response = await axios.get(url,{
          params:queryParams
        });

        if (response && response.data) {
          setVideos(response.data.data);
           // Set the videos initially
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeCategory,searchQuery]); // Empty dependency array to run the fetch only once


function handleCategoryChange(category){
  setActiveCategory(category)
}


  if (isLoading) {
    return (
      <div className="w-[82%] bg-black backdrop-blur-xs flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-black gap-6 p-2 h-screen flex flex-col overflow-auto w-[82%]">
      <CategoryBar activeCategory={activeCategory} handleCategoryChange={handleCategoryChange} />
      <div className="flex gap-5 overflow-auto h-screen flex-wrap">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <VideoCard2 key={index} video={video} />
          ))
        ) : (
          <p className="text-white">No videos found</p>
        )}
      </div>
    </section>
  );
};
