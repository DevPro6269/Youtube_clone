import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApiRequest from "../Hooks/useApiRequest";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

export const CreateChannel = () => {
  const [triggerRequest, setTriggerRequest] = useState(false);
  const url = `https://youtube-clone-4vf7.onrender.com/api/channel`
  const[errors,setErrors] = useState({})
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    profile: null, // This will hold the image file
  });


  const {data,loading,error}=useApiRequest(url,triggerRequest,"POST",formData)
  
  useEffect(()=>{
    // console.log( data && data.data)
    // console.log( error && error.message);
    
    if(error){
    setTriggerRequest(false)
    }
    if(data && data.statusCode==201 ){
      navigate("/")
      toast.success("channel created successfully")
    }
     
    setFormData({
      channelName: "",
      description: "",
      profile: "", 
    })
  },[data,error])

  // Handle form input changes
  async function handleChange(e) {
    const { name, value, type, files } = e.target;

    // Check if the field is a file input (image in this case)
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        profile: files[0], // Store the first file selected
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Update the value for text inputs
      }));
    }

  }

  // Handle form submission (Create Channel)
 async function handleClick() {
    // Here you can process the form data (e.g., send it to an API)
    setErrors({})
     const error = {}
  if(!formData.channelName){
    error.channelName = "please provide a channel name"
  }
  if(!formData.description){
    error.description = "please provide a description"
  }

  if(!formData.profile){
    error.profile= "please choose a profile for a channel"
  }

  if(Object.keys(error).length>0){
    setErrors(error)
    return;
  }

  const formToSubmit = new FormData();
  formToSubmit.append("channelName", formData.channelName);
  formToSubmit.append("description", formData.description);
  formToSubmit.append("profile", formData.profile);
  
  setFormData(formToSubmit);
  setTriggerRequest(true)
  }

  return (
   
    <div className="h-screen w-full lg:w-[82%] pb-5 bg-zinc-700 top-0 z-10 flex justify-center items-center">
  <div className="bg-white h-auto md:h-[80%] w-[90%] md:w-[80%] flex flex-col justify-between p-4 rounded-2xl">
    <div className="p-3">
      <h1 className="text-3xl text-center">How you'll appear</h1>
    </div>

    <form className="mt-2 md:-mt-10 self-center">
      <div className="flex flex-col gap-6">
        <div className="flex items-center flex-col gap-4">
          {/* Label and Image Preview */}
          <label htmlFor="image" className="cursor-pointer">
            <div
              className={`h-24 w-24 rounded-full flex justify-center items-center ${
                formData.profile ? "bg-transparent" : "bg-blue-300"
              }`}
            >
              {/* Display the selected image if available */}
              {formData.profile ? (
                <img
                  src={URL.createObjectURL(formData.profile)}
                  alt="Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <i className="fa-solid text-6xl fa-user text-blue-600"></i> // Default icon
              )}
            </div>
          </label>

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            id="image"
            className="hidden"
            onChange={handleChange}
          />

          {/* Instructions */}
          <p className="text-blue-500">Select Picture</p>
        </div>
        {errors.profile && <p className="text-red-500 text-center text-sm ">{errors.profile}</p>}

        {/* Channel Name and Description Inputs */}
        <div className="flex flex-col md:items-center justify-between gap-4">
          <div className="border w-full md:w-[40%] rounded-md bg-slate-100 px-1">
            <label className="text-sm" htmlFor="channelName">
              Name
            </label>
            <input
              type="text"
              name="channelName"
              onChange={handleChange}
              value={formData.channelName}
              className="outline-none w-full p-1"
            />
          </div>
          {errors.channelName && <p className="text-red-500 text-center text-sm ">{errors.channelName}</p>}

          <div className="border w-full md:w-[40%] rounded-md bg-slate-100 px-1">
            <label className="text-sm" htmlFor="channelDescription">
              Description
            </label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
              className="outline-none w-full p-1"
            />
          </div>
        
        {errors.description && <p className="text-red-500  text-sm ">{errors.description}</p>}
        {error && <p className="text-red-500  text-sm ">{error.message}</p>}
  
        </div>

        <div className="flex justify-center">
          <p className="w-[90%] md:w-[70%] text-sm text-center">
            By clicking create channel you agree to YouTube's Terms of
            Service. Changes to your name and profile picture are visible
            only on YouTube and not other Google services. Learn More
          </p>
        </div>
      </div>
    </form>

    {/* Buttons */}
    <div className="flex flex-col md:flex-row gap-5 justify-between md:justify-end items-center p-2">
      <Link to="/">
        <button className="outline rounded-xl p-2 px-4 w-full md:w-auto">
          Cancel
        </button>
      </Link>
      <button
      disabled={loading}
        onClick={handleClick}
        className={`text-white px-4 p-2 ${loading?"bg-gray-500":"bg-blue-500"} rounded-xl  hover:bg-blue-400 w-full md:w-auto`}
      >
        {loading?"Creating...":"Create Channel"}
      </button>
    </div>
  </div>
</div>

  );
};
