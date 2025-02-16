import React from "react";
import { Link } from "react-router-dom";
import Options from "./Sidebar/Options";
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
        <Link>
          <Options
            icon={
              <i class="fa-solid fa-house" style={{ color: "#ffffff" }}></i>
            }
            text={"Home"}
          />
        </Link>

        <Options
          icon={<i class="fa-solid fa-house" style={{ color: "#ffffff" }}></i>}
          text={"Shorts"}
        />

        <Options
          icon={
            <i
              class="fa-brands fa-square-youtube fa-lg"
              style={{ color: "#dee4ed;" }}
            ></i>
          }
          text={"Subscription"}
        />
      </div>

      <div className="bg-gray-600 w-full mt-2 h-[1px]"></div>

      {/* /////////////// users optins */}

      <div className="flex mt-2 flex-col">
        <Options
          icon={
            <i class="fa-solid fa-user fa-lg" style={{ color: "#fafcff" }}></i>
          }
          text={"You"}
        />
        <Options
          icon={<i class="fa-solid fa-clock-rotate-left"></i>}
          text={"History"}
        />
      </div>

      <div className="bg-gray-600 mt-2 w-full h-[1px]"></div>

      {/* ////////////////  for sign out users */}
      <div className="flex mt-2 flex-col">
        <Link to={"/sign-up"}>
          <div className=" w-48 text-blue-500 rounded-2xl flex flex-col gap-2 px-4 p-2">
            <div className="text-white text-[13px]">
              Sign in to like videos, comment, and subscribe.
            </div>
            <div className="flex gap-6 items-center font-light">
              <div className="flex p-2 outline h-8 items-center gap-3 outline-blue-400 rounded-full">
                {/* <div className="outline-blue-500 p-1 outline rounded-full flex justify-center items-center"> */}
                <i class="fa-regular fa-xs fa-user"></i> {/* </div> */}
                <span className="text-blue-500">Sign in</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-gray-600 mt-2 w-full h-[1px]"></div>

      {/* ///////  explores ////////// */}

      <div className="flex mt-2 flex-col">
        <h1 className="p-2">Explore</h1>

        <Options
          icon={<i class="fa-solid fa-lg fa-fire"></i>}
          text={"Trending"}
        />

        <Options
          icon={<i class="fa-solid fa-lg fa-music"></i>}
          text={"Music"}
        />

        <Options
          icon={<i class="fa-regular fa-lg fa-heart"></i>}
          text={"Live"}
        />

        <Options
          icon={<i class="fa-solid fa-lg fa-gamepad"></i>}
          text={"Gaming"}
        />

        <Options
          icon={<i class="fa-solid fa-lg fa-clapperboard"></i>}
          text={"Movie"}
        />

        <Options
          icon={<i class="fa-solid fa-lg fa-trophy"></i>}
          text={"Sports"}
        />
      </div>

      {/* /////////////       setting and privacy controls      //////////// */}
      <div className="bg-gray-600 mt-2 w-full h-[1px]"></div>

      <div className="flex mt-2 flex-col">
        <Options
          icon={<i class="fa-solid fa-lg fa-gear"></i>}
          text={"Settings"}
        />

        <Options
          icon={<i class="fa-solid fa-lg fa-flag"></i>}
          text={"Report history"}
        />

        <Options
          icon={<i class="fa-solid fa-lg fa-circle-info"></i>}
          text={"Help"}
        />

        <Options
          icon={<i class="fa-regular fa-lg fa-message"></i>}
          text={"Send feedback"}
        />
      </div>

      {/* end of div */}
    </div>
  );
};

export default Sidebar;
