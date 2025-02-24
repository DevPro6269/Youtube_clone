import React, { useEffect, useState } from "react";
import VideoCard2 from "./VideoCard2";
import axios from "axios";
import CategoryBar from "./CategoryBar";
import Loader from "../../Loader";
import { useOutletContext } from "react-router-dom";

export const VideoGrid = () => {
  const[showMenu,setShowMenu]=useState(false);
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { searchQuery } = useOutletContext(); // Get search query from Layout
  const [activeCategory, setActiveCategory] = useState("All");
  const[sortBy,setSortBy] = useState("")
  const url = `https://youtube-clone-4vf7.onrender.com/api/video`;
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
    <section className="bg-black gap-6 p-2  relative flex flex-col overflow-auto w-screen xl:[84%] 2xl:w-[85%] lg:w-[82%]">
      <CategoryBar activeCategory={activeCategory} handleCategoryChange={handleCategoryChange} />
      <br />
      <div className="grid gap-5 border-2 p-4 overflow-auto max-h-screen grid-cols-2  md:grid-cols-3">
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
