import { useState, useEffect } from "react";
import axios from "axios";

function useApiRequest(url,triggerRequest, method = "GET", reqData = null, withCredentials = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(triggerRequest);
    
    if (!triggerRequest) return;

    async function fetchData() {
      try {
        let response;
        setLoading(true);
        // Axios configuration with `withCredentials`
        const config = {
          withCredentials: withCredentials, // Add this to every request
        };

        if (method === "GET") {
          console.log("1g");
          
          response = await axios.get(url, config);
        } else if (method === "POST") {  
          response = await axios.post(url, reqData, config);
        } else if (method === "PUT") {
          response = await axios.put(url, reqData, config);
        } else if (method === "DELETE") {
          response = await axios.delete(url, config);
        }
        
        console.log(response);

        if (response && response.data) {
          setData(response.data);
          
          
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.response.data || "Something went wrong");
        
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, method, reqData, withCredentials,triggerRequest]);

  return { data, loading, error };
}

export default useApiRequest;
