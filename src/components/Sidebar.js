import React from "react";
import { FaDev } from "react-icons/fa";
import { Link } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { LoadingContext } from "../context/load.context";
import { useContext } from "react";
import { RiDashboard2Line } from "react-icons/ri";
import { GiSuitcase } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { VscTasklist } from "react-icons/vsc";
import { IoCreate } from "react-icons/io5";
import { RiLoginCircleFill } from "react-icons/ri";
import { BsPersonVcardFill } from "react-icons/bs";
import myImage from "../assets/images/hoodie.png";
import { Image } from "./Image";

export const Sidebar = () => {
  const isMobile = useMediaQuery();
  const { user, image } = useContext(LoadingContext);

  const linkClass = "flex items-center gap-2 px-3 py-2 hover:bg-neutral-700";
  return (
    <>
      {isMobile ? (
        <div className="flex flex-col w-60 mainColor text-white hidden">
          <div className="flex items-center gap-2 px-1 py-5">
            <span>
              <FaDev />
            </span>
            <h2>Julian</h2>
            {/* <img src={user?.profilePicture}></img> */}
          </div>
          <Link to="/" className={linkClass}>
            Dashboard
          </Link>
          <Link className={linkClass}>Settings</Link>
          <Link to="/dailygoals" className={linkClass}>
            Dailies
          </Link>
        </div>
      ) : (
        <div className="flex flex-col text-white w-60 ">
          <div className="flex gap-2 px-1 py-5 mx-2">
            <span>
              <FaDev />
            </span>
          </div>
          <div class="flex justify-center mt-10">
            <div class="flex flex-col">
              {/* {user?.profilePicture ? (
                <img src={user?.profilePicture} class="h-20 w-20"></img>
              ) : ( */}
              <img
                src={myImage}
                style={{ background: "black" }}
                class="mainColor h-28 w-28"
              />
              {/* )} */}
              <h2 class="text-center">
                {" "}
                {user?.firstName + user?.lastName
                  ? user?.firstName + user?.lastName
                  : ""}
              </h2>
            </div>
          </div>
          <p class="text-center">{user?.email}</p>

          <div class="mt-14">
            <Link to="/" className={linkClass}>
              <span>
                {" "}
                <RiDashboard2Line />
              </span>
              Dashboard
            </Link>
            <Link to="/settings" className={linkClass}>
              <IoSettingsOutline />
              Settings
            </Link>
            <Link to="/dailygoals" className={linkClass}>
              <VscTasklist /> Dailies
            </Link>
            <Link to="/jobs" className={linkClass}>
              <span>
                <GiSuitcase />
              </span>{" "}
              Jobs
            </Link>
            <Link to="/createJob" className={linkClass}>
              <IoCreate />
              Create Job
            </Link>
            <Link to="/signup" className={linkClass}>
              <BsPersonVcardFill />
              Signup
            </Link>
            <Link to="/login" className={linkClass}>
              <RiLoginCircleFill />
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
