import React from "react";

import { LoadingContext } from "../context/load.context";
import { useContext } from "react";

export const DashBoardGrid2 = () => {
  const { percentageApplied, percentageRejected, percentageFollowUp } =
    useContext(LoadingContext);
  return (
    <div className="flex mx-4 ">
      <div className=" mainColor rounded-md h-32 flex-1 flex flex-col items center justify-around  mx-2 px-3 ">
        {/* <div className="flex items-center justify-center">
        <IoBagHandle />
      </div> */}
        <h3 className="flex items-center pr-1">
          Percentage change of jobs applied from previous to current month:
        </h3>
        <p class="self-end">{percentageApplied}%</p>
      </div>
      <div className="rounded-md h-32 flex-1 mainColor flex flex-col items center justify-around  mx-2 px-3 ">
        <h3 className="flex items-center">
          Compare jobs rejected to last month:
        </h3>
        <p class="self-end">{percentageRejected}%</p>
      </div>
      <div className="rounded-md h-32 flex-1 mainColor flex flex-col items center justify-around  mx-2 px-3 ">
        <h3 className="flex items-center">
          Jobs followed up from this month to last:
        </h3>
        <p class="self-end">{percentageFollowUp}%</p>
      </div>
    </div>
  );
};
