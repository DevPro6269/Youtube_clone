import React,{useState} from "react";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setHamburgerMenu} from "../Store/hamburgerMenuSlice.js"

const Navbar = ({handleClick=null,searchQuery,onSearchChange}) => {
  const userLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  const user = useSelector((state)=>state.user.user)
  const[profile,setProfile]=useState(false)
  const dispatch = useDispatch()
 
  function hamburgerMenuClick(){
     dispatch(setHamburgerMenu())
  }

  


  return (
    <>
      <nav className="bg-black   gap-3 z-50 w-screen   fixed top-0 items-center justify-between   flex p-2 ">
        <div onClick={handleClick?handleClick:hamburgerMenuClick} className="flex h-[48px] w-[35%] md:w-[25%] items-center" >
          <i className="fa-solid fa-bars  text-white md:fa-lg"></i>
          &nbsp; &nbsp;  &nbsp; 
          <i
            className="fa-brands text-red-500 fa-youtube text-lg md:fa-2xl"
          ></i> &nbsp; 
          <span className="text-white text-lg md:text-xl">
            YouTube 
          </span>{" "}
          <sup className="text-gray-400 hidden  sm:block text-xs">IN</sup>
        </div>

        {/* // search bar  */}

        <div className="flex flex-1 w-[45%] md:w-[55%] md:gap-2">
          <div className="flex w-full  items-center">
            <input
              placeholder="search"
              className="md:h-10 h-6 w-full px-3 outline text-gray-500 rounded-l-full  outline-gray-500"
              type="text"
              name=""
              id=""
              value={searchQuery}
              onChange={(e)=>onSearchChange(e.target.value)}
            />
            <div className="bg-slate-800 outline p-1 outline-gray-500 h-6 md:h-[40px] flex justify-center items-center rounded-r-full w-6 md:w-12">
              <i
                className="fa-solid fa-magnifying-glass fa-sm md:fa-lg"
                style={{ color: "#ffffff" }}
              ></i>
            </div>
          </div>

          <div className="md:flex justify-center hidden  items-center bg-slate-700 h-10 w-10 rounded-full">
            <i
              className="fa-solid fa-microphone fa-lg"
              style={{ color: "#fafafa" }}
            ></i>
          </div>
        </div>

        {/* div for sign out users  */}
        <div className={`flex w-[20%] border-2 justify-end px-2 gap-2 ${userLoggedIn?"hidden":"flex"}  items-center`}>
         <Link to={"/sign-up"}>
              <div className="flex md:p-2 w-fit outline p-1 items-center rounded-3xl md:gap-3 outline-blue-400">
              <p className="hidden md:block"><i className="fa-regular  text-blue-400  md:block fa-xs fa-user"></i> </p>   {/* </div> */}
                <p className="text-blue-500   text-[10px] md:text-base ">Sign in</p>
              </div>
         </Link>

        </div>


        {/* div for sign in user  */}

        <div className={`flex w-[25%] justify-end text-white md:text-xl ${userLoggedIn?"flex":"hidden"}  gap-4 md:gap-8  md:mr-2`}>
            <Link to={"/video/new"} className="items-center flex" >
            <div className="flex justify-center items-center">
             <i className="fa-solid  fa-video" >
             </i>
             </div>
            </Link>

             <div className="flex justify-center items-center">
             <i className="fa-regular  fa-bell" ></i>
             </div>
             <div onClick={()=>{setProfile((prev)=>!prev)}} className=" md:h-8 md:w-8 h-5 w-5 relative rounded-full">
            <img src={user && user.profile} className="h-full object-cover rounded-full w-full" alt="" />
             {profile?<Profile/>:""}
             </div>
        </div>
      </nav>
     <br /> <br />
    </>
  );
};

export default Navbar;
