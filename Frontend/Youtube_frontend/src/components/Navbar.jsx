import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-black gap-36 items-center justify-between flex p-3">
        <div>
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

        {/* // search bar  */}

        <div className="flex gap-5">
          <div className="flex items-center">
            <input
              placeholder="search"
              className="h-10 w-[500px] outline text-gray-500 rounded-l-full px-3 outline-gray-500"
              type="text"
              name=""
              id=""
            />
            <div className="bg-slate-800 outline outline-gray-500 h-[40px] flex justify-center items-center rounded-r-full w-12">
              <i
                class="fa-solid fa-magnifying-glass fa-lg"
                style={{ color: "#ffffff" }}
              ></i>
            </div>
          </div>

          <div className="flex justify-center items-center bg-slate-700 h-10 w-10 rounded-full">
            <i
              class="fa-solid fa-microphone fa-lg"
              style={{ color: "#fafafa" }}
            ></i>
          </div>
        </div>

        {/* div for sign in options */}
        <div className="flex gap-2 hidden items-center">
          <div>
            <i
              class="fa-solid fa-ellipsis-vertical"
              style={{ color: "#ffffff" }}
            ></i>
          </div>

          <div className="flex p-2  outline h-10 gap-3 outline-white text-white rounded-full">
            <div className="outline-white p-1 outline rounded-full flex justify-center items-center">
              <i class="fa-regular fa-user" style={{ color: " #ffffff" }}></i>{" "}
            </div>
          <span className="text-white">Sign in</span>
          </div>
        </div>


        {/* div for sign in user  */}

        <div className="flex gap-8 mr-2">
             <div className="flex justify-center items-center">
             <i class="fa-solid fa-xl fa-video" style={{color: "#f5f7f9"}}>
             </i>
             </div>

             <div className="flex justify-center items-center">
             <i class="fa-regular fa-xl fa-bell" style={{color: "#ffffff"}}></i>
             </div>
             <div className="h-8 w-8 rounded-full">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuCgYhXnM81IAW-mTKqqjn-jmVIncQAQZq5w&s" className="h-full object-cover rounded-full w-full" alt="" />
             </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
