import React from "react";
import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { LoadingContext } from "../context/load.context";
import myImage from "../assets/images/hoodie.png";

export const Header = () => {
  const [hamburgerToggle, setHamburgerToggle] = useState(false);
  const [show, setShow] = useState(true);
  const { user, image } = useContext(LoadingContext);

  return (
    <div className="h-16 px-4 bg-black flex justify-end items-center ">
      {/* <div class="w-4/5">
        <input type="text" placeholder="Search..." class="w-2/5 h-8" />
      </div> */}
      <div class="w-1/5 flex justify-around">
        {/* {user?.profilePicture ? (
          <img
            class="rounded-md"
            src={user?.profilePicture}
            style={{ width: "30px" }}
            alt="mypic"
          ></img>
        ) : ( */}
        <img src={myImage} style={{ width: "50px" }} />
        {/* )} */}
        <h2 id="myName" class="flex justify-center items-center">
          {user?.firstName + user?.lastName
            ? user?.firstName + user?.lastName
            : ""}
        </h2>
      </div>
      <div className="dropDiv">
        {!show ? (
          <div
            className="hamburgerMenu"
            onClick={() => {
              setShow(!show);
              setHamburgerToggle(!hamburgerToggle);
            }}
          >
            <div
              className={!hamburgerToggle ? "hamburgerItem" : "hamburgerItemX"}
            ></div>
            <div
              className={
                !hamburgerToggle ? "hamburgerItem" : "hamburgerItemXSecond"
              }
            ></div>
            <div
              className={
                !hamburgerToggle ? "hamburgerItem" : "hamburgerItemXLast"
              }
            ></div>

            <ul class="dropdown-menu">
              <li>
                {/* <button class="dropdown-item" type="button"> */}
                <Link to="/" class="item">
                  Home
                </Link>
                {/* </button> */}
              </li>
              <li>
                <Link to="/jobs" class="item">
                  Jobs
                </Link>
              </li>
              <li>
                {/* <button class="dropdown-item" type="button"> */}
                <Link to="/createJob" className="item">
                  Create a Job
                </Link>
                {/* </button> */}
              </li>
              <li>
                {/* <button class="dropdown-item" type="button"> */}
                <Link to="/" className="item">
                  Dashboard
                </Link>
                {/* </button> */}
              </li>
              <li>
                {/* <button class="dropdown-item" type="button"> */}
                <Link to="/dailygoals" className="item">
                  Dailies
                </Link>
                {/* </button> */}
              </li>
            </ul>
          </div>
        ) : (
          <div
            className="hamburgerMenu"
            onClick={() => {
              setShow(!show);
              setHamburgerToggle(!hamburgerToggle);
            }}
          >
            <div
              className={!hamburgerToggle ? "hamburgerItem" : "hamburgerItemX"}
            ></div>
            <div
              className={
                !hamburgerToggle ? "hamburgerItem" : "hamburgerItemXSecond"
              }
            ></div>
            <div
              className={
                !hamburgerToggle ? "hamburgerItem" : "hamburgerItemXLast"
              }
            ></div>
          </div>
          // <button
          //   class="dropDownButton "
          //   onClick={() => {
          //     setShow(!show);
          //   }}
          // >
          //   {/* Explore */}
          // </button>
        )}
      </div>
    </div>
  );
};
