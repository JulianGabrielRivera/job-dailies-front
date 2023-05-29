import React from "react";
import { RxCross2 } from "react-icons/rx";
import { MdEditNote } from "react-icons/md";

export const JobDetails = ({ jobDetails }) => {
  return (
    <>
      <div class="">
        <div
          onClick={() => {}}
          class=" h-80 rounded-md mainColor flex flex-col mb-4  "
          // style={{ width: "360px" }}
        >
          <div class="flex justify-end  mt-2">
            <MdEditNote />
            <RxCross2 />
          </div>

          <article class=" ml-3 w-fit flex justify-around flex-col h-4/5">
            <h2>Company Name:{jobDetails?.companyName}</h2>
            <p>Job Role: {jobDetails?.jobRole}</p>

            <p>Date applied: {jobDetails?.date}</p>
            <p>Status: {jobDetails?.status}</p>

            <p>Source: {jobDetails?.source}</p>

            <p>Recruiter: {jobDetails?.recruiter}</p>

            <a href="">Link to job</a>
          </article>
        </div>
      </div>
    </>
  );
};
