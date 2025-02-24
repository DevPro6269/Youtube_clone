import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useApiRequest from '../Hooks/useApiRequest';
import VerifyOtp from '../components/VerifyOtp';
import { toast } from 'react-toastify';

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false);  
  const [triggerRequest, setTriggerRequest] = useState(false);
  const url = "http://localhost:8000/api/user/signup";
  
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // API Request hook
  const { data, loading, error } = useApiRequest(url, triggerRequest, "POST", formData);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UseEffect to log response data and errors
  useEffect(() => {
      if (error) {
        console.log("Error:", error);
        return;
      }
      
    if (data && data.statusCode === 200 && !error) {
      console.log(data);
      toast.success("Otp sent to the mail")
      setIsVisible(true); // Show OTP verification form after successful signup
    }

    setTriggerRequest(false); // Reset the trigger once the request completes
  }, [data, error]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      return alert("All fields must be filled out!");
    }

    // Trigger the request
    setTriggerRequest(true);
  };

  return (
    <>
      {/* <section className='w-[82%] flex justify-center pb-20 items-center h-screen'>
        <div className='flex bg-white'>
          <div className='w-[50%]'>
            <img src="https://res.cloudinary.com/dqlryem36/image/upload/v1739619803/development_nfbbl3.png" alt="Signup illustration" />
          </div>

          <form onSubmit={handleSubmit} className='bg-white p-4 w-[50%] flex items-center flex-col gap-8'>
            <div className='self-center'>
              <h1 className='text-3xl'>Sign Up</h1>
            </div>

            <div>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder='First Name'
                className='border-b w-66 outline-none'
              />
            </div>

            <div>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder='Last Name'
                className='border-b w-66 outline-none'
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder='Email'
                className='border-b w-66 outline-none'
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder='Password'
                className='border-b w-66 outline-none'
              />
            </div>

            <div className='w-full justify-center flex'>
              <button
                type="submit"
                className='p-2 font-semibold w-[70%] border bg-blue-500 hover:bg-blue-400 text-white rounded-md'
                disabled={loading} // Disable when loading
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>

            {error && <p className='text-red-600'>{error.message || "An error occurred."}</p>}

            <div>
              <p>Already have an account? <Link className='text-blue-500' to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </section> */}
     <section className="w-full flex justify-center items-center h-screen px-4 lg:w-[81%]  bg-gray-900">
  <div className="flex w-full max-w-4xl p-6 mx-auto bg-white shadow-lg rounded-xl">
    
    {/* Image Section - Hidden on mobile */}
    <div className="hidden md:w-1/2 md:flex justify-center mb-6 md:mb-0">
      <img 
        src="https://res.cloudinary.com/dqlryem36/image/upload/v1739619803/development_nfbbl3.png" 
        alt="Signup illustration" 
        className="w-full max-w-[400px] h-auto"
      />
    </div>

    {/* Sign-up Form */}
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-6 px-6 py-4">
      
      {/* Form Header */}
      <div className="self-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Sign Up</h1>
        <p className="text-gray-500">Create an account to get started</p>
      </div>

      {/* First Name Input */}
      <div>
        <input 
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Last Name Input */}
      <div>
        <input 
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email Input */}
      <div>
        <input 
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Input */}
      <div>
        <input 
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sign-up Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-2">{error.message || "An error occurred."}</p>}

      {/* Login Link */}
      <div className="text-center mt-4 text-gray-600 text-sm">
        <p>Already have an account? 
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>

    </form>
  </div>
</section>



      {/* OTP Verification component will only be visible after a successful signup */}
      {isVisible && <VerifyOtp isVisible={isVisible} setIsVisible={setIsVisible} formData={formData} />}
    </>
  );
};

export default Signup;
