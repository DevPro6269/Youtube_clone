import React, { useState,useEffect } from 'react';
import useApiRequest from '../Hooks/useApiRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../Store/userSlice';


const VerifyOtp = ({ isVisible, setIsVisible,formData }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
    const [triggerRequest, setTriggerRequest] = useState(false);
    const url = "http://localhost:8000/api/verify";

    const { data, loading, error } = useApiRequest(url, triggerRequest, "POST", formData);

useEffect(() => {
      if (error) {
        console.log("Error:", error);
        return;
      }
      
      console.log(data);
    if (data && data.statusCode === 201 && !error) {
       dispatch(setLoggedIn(data.data))
      navigate("/")
      // Show OTP verification form after successful signup
    }


    setTriggerRequest(false); // Reset the trigger once the request completes
  }, [data, error]);


  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Automatically move focus to next input after typing
    if (value !== "") {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setIsVisible(false);
  };

  // Handle Verify (Here you can process the OTP)
  const handleVerify = () => {
    const enteredOtp = otp.join("")
    if(enteredOtp.length!==4){
    alert("enter 4 digit valid otp")
    }
    
    formData.otp = enteredOtp;
     setTriggerRequest(true)
    // Add your OTP verification logic here (e.g., call an API with the OTP)
  };

  return (
    <div
      id="parent"
      className={`h-screen backdrop-blur-xs ${isVisible ? "block" : "hidden"} absolute w-screen z-10`}
    >
      <div className="h-[40%] z-10 flex flex-col items-center gap-5 bg-black text-white outline bg-opacity-60 w-[30%] absolute top-[30%] left-[35%] backdrop-blur-lg">
        <div>
          <h1 className="text-2xl">Verify your OTP</h1>
        </div>

        <div>
          <img src="https://res.cloudinary.com/dqlryem36/image/upload/v1739764431/pin_kbtpdw.png" alt="PIN" />
        </div>

        <div className="flex gap-2">
          {otp.map((_, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              className="h-10 w-10 outline text-3xl flex justify-center items-center p-1 px-2"
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="px-3 text-xl p-1 outline outline-white hover:bg-white hover:text-black rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleVerify}
            className="px-3 text-xl text-white p-1 bg-blue-500 hover:bg-blue-400 rounded-md"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
