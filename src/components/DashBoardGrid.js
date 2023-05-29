import React from "react";
import { IoBagHandle } from "react-icons/io5";

import { LoadingContext } from "../context/load.context";
import { useContext, useState, useEffect } from "react";
import { get } from "../services/authService";
export const DashBoardGrid = () => {
  const [monthMay, setMonthMay] = useState(null);
  const { user, months, sumOfAll, sumOfRejectedAll, jobsPerDay } =
    useContext(LoadingContext);

  return (
    <>
      {months?.length === 1 ? (
        <div className="flex mx-4 grid">
          <div className=" bg-blue-500 rounded-md h-32 flex-1 flex flex-col items center justify-around  mx-2 mb-6 px-3 ">
            {/* <div className="flex items-center justify-center">
          <IoBagHandle />
        </div> */}
            <h3 className="flex items-center">Jobs Applied: </h3>
            <p class="self-end">{months[0] && months[0]?.jobsApplied}</p>
          </div>
          <div className=" bg-blue-500 rounded-md h-32 flex-1  flex flex-col items center justify-around  mx-2 px-3 mb-6 ">
            <h3 className="flex items-center">Jobs Rejected: </h3>
            <p class="self-end">{months[0] && months[0]?.jobsRejected}</p>
          </div>
          <div className="rounded-md h-32 flex-1 mainColor flex flex-col items center justify-around  mx-2 px-3 mb-6">
            <h3 className="flex items-center">Jobs followed up: </h3>
            <p class="self-end">{user?.totalFollowUps}</p>
          </div>
          <div className="rounded-md h-32 flex-1 mainColor flex flex-col items center justify-around  mx-2 px-3 ">
            <h3 className="flex items-center">Jobs per day: </h3>
            <p class="self-end">
              {(months[0]?.jobsApplied / months[0]?.daysApplied).toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex mx-4 grid">
          <div className=" bg-blue-500 rounded-md h-32 flex-1 flex flex-col items center justify-around w-full mx-2 mb-6 ">
            {/* <div className="flex items-center justify-center">
        <IoBagHandle />
      </div> */}
            <h3 className="flex items-center">Jobs Applied: </h3>
            <p class="self-end">{sumOfAll()}</p>
          </div>
          <div className=" bg-blue-500 rounded-md h-32 flex-1  flex flex-col items center justify-around w-full mx-2 px-3 mb-6 ">
            <h3 className="flex items-center">Jobs Rejected: </h3>
            <p class="self-end">{sumOfRejectedAll() && sumOfRejectedAll()}</p>
          </div>
          <div className="rounded-md h-32 flex-1 mainColor flex flex-col items center justify-around w-full mx-2 px-3 mb-6">
            <h3 className="flex items-center">Jobs followed up: </h3>
            <p class="self-end">{user?.totalFollowUps}</p>
          </div>
          <div className="rounded-md h-32 flex-1 mainColor flex flex-col items center justify-around w-full mx-2 px-3 ">
            <h3 className="flex items-center">Jobs per day: </h3>
            <p class="self-end">{jobsPerDay() ? jobsPerDay().toFixed(2) : 0}</p>
          </div>
        </div>
      )}
    </>
  );
};
