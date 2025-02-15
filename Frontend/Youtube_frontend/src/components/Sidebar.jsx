import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-black h-screen w-[18%] overflow-auto text-white  px-4 p-2">
      <div className="w-fit hidden">
        <i class="fa-solid fa-bars fa-xl" style={{ color: "#ffffff" }}></i>
        &nbsp; &nbsp; &nbsp;
        <i
          class="fa-brands fa-youtube  fa-2xl"
          style={{ color: "#dd1313" }}
        ></i>
        <span className="text-white text-xl">
          YouTube <sup className="text-gray-400 text-xs">IN</sup>{" "}
        </span>
      </div>


{/* ///////////////////    options ///// */}
      <div className="flex mt-2  flex-col">
        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
            <i class="fa-solid fa-house" style={{ color: "#ffffff" }}></i>
            <h1>Home</h1>
          </div>
        </div>
        <div className="hover:bg-gray-600 w-48  rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light ">
            <i class="fa-solid fa-house" style={{ color: "#ffffff" }}></i>

            <h1>Shorts</h1>
          </div>
        </div>
        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light ">
            <i
              class="fa-brands fa-square-youtube fa-lg"
              style={{ color: "#dee4ed;" }}
            ></i>
            <h1>Subscription</h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-600 w-full mt-2 h-[1px]"></div>



{/* /////////////// users optins */}

      <div className="flex mt-2 flex-col">
        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
            <i class="fa-solid fa-user fa-lg" style={{ color: "#fafcff" }}></i>
            <h1>You</h1>
          </div>
        </div>

        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <h1>History</h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-600 mt-2 w-full h-[1px]"></div>


{/* ////////////////  for sign out users */}
      <div className="flex mt-2 flex-col">
        <div className=" w-48 text-blue-500 rounded-2xl flex flex-col gap-2 px-4 p-2">
          <div className="text-white text-[13px]">
            Sign in to like videos, comment, and subscribe.
          </div>
          <div className="flex gap-6 items-center font-light">
            <div className="flex p-2 outline h-8 items-center gap-3 outline-blue-400 rounded-full">
              {/* <div className="outline-blue-500 p-1 outline rounded-full flex justify-center items-center"> */}
                <i class="fa-regular fa-xs fa-user"></i>{" "}
              {/* </div> */}
              <span className="text-blue-500">Sign in</span>
            </div>
          </div>
        </div>
      </div>



      <div className="bg-gray-600 mt-2 w-full h-[1px]"></div>

{/* ///////  explores ////////// */}


<div className="flex mt-2 flex-col">
 <h1 className="p-2">Explore</h1>

 <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-solid fa-lg fa-fire"></i> 
           <h1>Trending</h1>
          </div>
        </div>

       
        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-solid fa-lg fa-music"></i>      
         <h1>Music</h1>
          </div>
        </div>

        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-regular fa-lg fa-heart"></i>
            <h1>Live</h1>
          </div>
        </div>


        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-solid fa-lg fa-gamepad"></i>
            <h1>Gaming</h1>
          </div>
        </div>


        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-solid fa-lg fa-clapperboard"></i>
            <h1>Movie</h1>
          </div>
        </div>


        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-solid fa-lg fa-trophy"></i>
            <h1>Sports</h1>
          </div>
        </div>
</div>




{/* /////////////       setting and privacy controls      //////////// */}
<div className="bg-gray-600 mt-2 w-full h-[1px]"></div>

      <div className="flex mt-2 flex-col">
        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-solid fa-lg fa-gear"></i>
            <h1>Settings</h1>
          </div>
        </div>

        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-solid fa-lg fa-flag"></i>
            <h1>Report history</h1>
          </div>
        </div>

        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-solid fa-lg fa-circle-info"></i>    
            <h1>Help</h1>
          </div>
        </div>

        <div className="hover:bg-gray-600 w-48 rounded-2xl px-4 p-2">
          <div className="flex gap-6 items-center font-light">
          <i class="fa-regular fa-lg fa-message"></i>  
          <h1>Send feedback</h1>
          </div>
        </div>


      </div>

      {/* end of div */}
    </div>
  );
};

export default Sidebar;
