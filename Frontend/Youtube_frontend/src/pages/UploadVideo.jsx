import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useApiRequest from '../Hooks/useApiRequest';

const UploadVideo = () => {
  const [triggerRequest, setTriggerRequest] = useState(false);
  const user = useSelector((state) => state.user.user);

  const url = `http://localhost:8000/api/video/${user.channel}`;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [], // Ensure tags is always an array
    video: null,
    thumbnail: null,
  });

  const { data, loading, error } = useApiRequest(url, triggerRequest, 'POST', formData);

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, error]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'tags') {
      // Ensure the value for tags is split into an array
      setFormData((prev) => ({
        ...prev,
        tags: value ? value.split(',').map((tag) => tag.trim()) : [], // Handle empty value as an empty array
      }));
    } else if (name === 'video' || name === 'thumbnail') {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if video and thumbnail files are provided
    if (!formData.video || !formData.thumbnail) {
      alert('Please select both video and thumbnail files.');
      return;
    }

    // Create a FormData object for submitting the form
    const formToSubmit = new FormData();
    formToSubmit.append('title', formData.title);
    formToSubmit.append('description', formData.description);
    
    // Send tags as an array
    formData.tags.forEach((tag) => formToSubmit.append('tags[]', tag)); // Appending each tag separately

    formToSubmit.append('video', formData.video);
    formToSubmit.append('thumbnail', formData.thumbnail);

    console.log('Form Data submitted', formToSubmit);

    setFormData(formToSubmit);

    if (user.channel) {
      console.log(user.channel);
      
      setTriggerRequest(true);
    }
  };

  return (
    <section className="w-[82%] h-screen bg-zinc-700 p-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Upload Your Video</h2>

        <form onSubmit={handleSubmit}>
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

          {/* Tags Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="tags">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Add tags (e.g., coding, tutorial)"
              value={formData.tags ? formData.tags.join(', ') : ''} // Check if tags is an array before using join
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              className="w-full p-3 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload Video
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadVideo;
