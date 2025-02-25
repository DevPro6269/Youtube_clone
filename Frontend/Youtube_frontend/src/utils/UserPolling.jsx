import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoggedIn, setLoggedOut, setUser } from "../Store/userSlice"; // Adjust the import path

const UserPolling = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    let pollingInterval;

    // If the user is logged in, start polling
    if (isLoggedIn) {
      pollingInterval = setInterval(async () => {
        try {
          const response = await axios.get("https://youtube-clone-4vf7.onrender.com/api/user", {
            withCredentials: true,
          });
          if (response && response.data && response.data.data) {
            dispatch(setUser(response.data.data)); // Dispatch action to update Redux state
          } else {
            // If the response data is not in the expected structure, handle it gracefully
            console.warn("Unexpected user data format received:", response.data);
          }
        } catch (error) {
          dispatch(setLoggedOut()); // Automatically log out the user if there's an error
          console.error("Error fetching user data:", error);
        }
      }, 5000); // Poll every 5 seconds (adjust based on your needs)

      // Cleanup the interval when the component unmounts or when isLoggedIn changes
      return () => clearInterval(pollingInterval);
    }

    // If not logged in, return early without starting the polling
    return () => {};
  }, [dispatch, isLoggedIn]);

  return null; // This component does not render anything, it just manages polling
};

export default UserPolling;
