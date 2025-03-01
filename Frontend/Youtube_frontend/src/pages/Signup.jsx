import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useApiRequest from '../Hooks/useApiRequest';
import VerifyOtp from '../components/VerifyOtp';
import { toast } from 'react-toastify';

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false);  
  const [triggerRequest, setTriggerRequest] = useState(false);
  const url = "https://youtube-clone-4vf7.onrender.com/api/user/signup";
  const[errors,setErros] =useState({})
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    setTriggerRequest(false)
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
     setErros({})
    const error = {}; // Object to store error messages
  
    // Check if first name is empty
    if (!formData.firstName) {
      error.FirstName = "First name cannot be empty";
    }
  
    // Check if last name is empty
    if (!formData.lastName) {
      error.lastName = "Last name cannot be empty";
    }
  
    // Check if email is empty or invalid
    if (!formData.email) {
      error.email = "Email cannot be empty";
    } else if (!emailRegex.test(formData.email)) { // Email regex validation
      error.email = "Invalid email format";
    }
  
    // Check if password is empty or doesn't meet criteria
    if (!formData.password) {
      error.password = "Password cannot be empty";
    } else if (formData.password.length < 6) { // Password length validation (minimum 6 characters)
      error.password = "Password must be at least 6 characters long";
    }
  
    // If any errors exist, show them and stop form submission
    if (Object.keys(error).length > 0) {
      // Optionally, display all errors in the UI (for now, alert them)
      setErros(error)
      return ; // You can customize this to display the error on the UI
    }
  
    // If no errors, trigger the request
    setTriggerRequest(true);
  };
  

  return (
    <>
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
        value={formData.firstName}
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      {errors.FirstName ? <p className='text-red-400'>{errors.FirstName}</p>:""}
      </div>
      {/* Last Name Input */}
      <div>
        <input 
         value={formData.lastName}
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         {errors.lastName ? <p className='text-red-400'>{errors.lastName}</p>:""}
      </div>

      {/* Email Input */}
      <div>
        <input 
         value={formData.email}
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
           {errors.email ? <p className='text-red-400'>{errors.email}</p>:""}
      </div>

      {/* Password Input */}
      <div>
        <input 
        value={formData.password}
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          {errors.password ? <p className='text-red-400'>{errors.password}</p>:""}
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
