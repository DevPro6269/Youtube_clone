import React, { useEffect, useState } from "react";
import VideoCard2 from "./VideoCard2";
import axios from "axios";
import CategoryBar from "./CategoryBar";
import Loader from "../../Loader";
import { useOutletContext } from "react-router-dom";

export const VideoGrid = () => {
  const url = "http://localhost:8000/api/video";
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { searchQuery } = useOutletContext(); // Get search query from Layout
  const [filteredVideos, setFilteredVideos] = useState([]); 

  // Fetch videos on initial load
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);

        if (response && response.data) {
          setVideos(response.data.data);
          setFilteredVideos(response.data.data); // Set the videos initially
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array to run the fetch only once

  // Filter videos based on search query
  useEffect(() => {
    const filterVideos = () => {
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
      );
      setFilteredVideos(filtered);
    };

    if (searchQuery) {
      filterVideos(); // Filter videos if there's a search query
    } else {
      setFilteredVideos(videos); // Show all videos when searchQuery is empty
    }
  }, [searchQuery, videos]); // Re-run filtering when searchQuery or videos change

  if (isLoading) {
    return (
      <div className="w-[82%] bg-black backdrop-blur-xs flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-black gap-6 p-2 h-screen flex flex-col overflow-auto w-[82%]">
      <CategoryBar />
      <div className="flex gap-5 overflow-auto h-screen flex-wrap">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <VideoCard2 key={index} video={video} />
          ))
        ) : (
          <p className="text-white">No videos found</p>
        )}
      </div>
    </section>
  );
};
