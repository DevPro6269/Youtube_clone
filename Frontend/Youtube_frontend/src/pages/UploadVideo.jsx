import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from "../Loader"
import { toast } from 'react-toastify';

const UploadVideo = () => {
  const user = useSelector((state) => state.user.user);
  const [uploading, setUploading] = useState(localStorage.getItem('uploading') === 'true'); // Retrieve uploading state from localStorage
  const channelId = user.channel._id;
  const Categories = ["All", "Music", "Funny", "Sports", "Movie", "News", "Study", "Cricket", "Kids", "Gaming"];
  const url = `https://youtube-clone-4vf7.onrender.com/api/video/${channelId}`;
  let toastId;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: "All",  // Default category is "All"
    video: null,
    thumbnail: null,
  });

  useEffect(() => {
    localStorage.setItem("uploading", uploading.toString());
  }, [uploading]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video' || name === 'thumbnail') {
      // Handle file input for video and thumbnail
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Access the file selected
      }));
    } else {
      // Handle other inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if video and thumbnail files are provided
    if (!formData.video || !formData.thumbnail) {
      alert('Please select both video and thumbnail files.');
      return;
    }
  
    if (!formData.title || !formData.description) {
      alert('Please provide title and description');
      return;
    }
  
    // Create a FormData object for submitting the form
    const formToSubmit = new FormData();
    formToSubmit.append('title', formData.title);
    formToSubmit.append('description', formData.description);  
    formToSubmit.append('category', formData.category);  // Include category in the submission
    formToSubmit.append('video', formData.video);
    formToSubmit.append('thumbnail', formData.thumbnail);
  
    try {
      setUploading(true);
       toastId = toast.loading("Uploading video...");
      const response = await axios.post(url, formToSubmit, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response && response.data) {
        localStorage.setItem("uploading", "false");
        setUploading(false)
       toast.dismiss(toastId)
        toast.success("video upload successfdully")
      }
  
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "Upload failed. Please try again.",
        type: "error",
        autoClose: 3000,
        style: {
          backgroundColor: "#f44336", // Error background color
          color: "white",              // Text color
          fontWeight: "bold",          // Font weight
          padding: "15px 30px",        // Padding around the toast
        },
      });

    } finally {
      setUploading(false)
      localStorage.setItem("uploading", "false")
    }
  };

  return ( 
    <section className="lg:w-[82%] pb-5 w-[100%] h-auto bg-zinc-700 p-10">
      <div className="max-w-xl relative mx-auto bg-white md:p-8 p-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Upload Your Video</h2>
       
        <form className='relative' onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter the title of your video"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter a description of the video"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              value={formData.category}  // Bind the selected category to formData
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Video File Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="videoUrl">
              Video File
            </label>
            <input
              type="file"
              name="video"
              id="videoUrl"
              accept="video/*" // Limit to video files
              onChange={handleChange}
              disabled={uploading}
              className="w-full p-3 bg-gray-100 border disabled:cursor-not-allowed rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thumbnail File Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2" htmlFor="thumbnailUrl">
              Thumbnail Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnailUrl"
              accept="image/*" // Limit to image files
              onChange={handleChange}
              disabled={uploading}
              className="w-full p-3 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        
         

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              disabled={uploading}
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload Video
            </button>
          </div>
        </form>

        {uploading && (
          <div className="w-full absolute top-0 left-0 h-full bg-transparent backdrop-blur-xs flex justify-center items-center">
            <Loader />
          </div>
        )}

      </div>
    </section>
  );
};

export default UploadVideo;
