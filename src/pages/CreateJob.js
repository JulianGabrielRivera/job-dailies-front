import React from "react";
import { Sidebar } from "../components/Sidebar";
import { useState, useContext } from "react";
import { post } from "../services/authService";
import { LoadingContext } from "../context/load.context";
import { Header } from "../components/Header";

export const CreateJob = () => {
  const {
    setJobs,
    jobs,
    user,
    setUser,
    setMonths,
    months,
    setPercentageApplied,
  } = useContext(LoadingContext);

  const TwelveMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [createJob, setCreateJob] = useState({
    companyName: "",
    jobRole: "",
    date: "",
    source: "",
    notes: "",
    recruiter: "",
    status: "",
    jobLink: "",
  });

  const jobHandler = (e) => {
    setCreateJob({
      ...createJob,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/jobs/create-job", createJob)
      .then((response) => {
        console.log(response.data);
        setJobs([response.data.createdJob, ...jobs]);
        // setUser(response.data.updatedUser);
        console.log(jobs);
        setMonths(response.data.months);
        let newDate = new Date();
        let optionsThree = {
          month: "long",
        };
        let month1 = newDate.toLocaleString("en-US", optionsThree);

        const arr = response.data.months.sort(function (a, b) {
          return TwelveMonths.indexOf(a.month) - TwelveMonths.indexOf(b.month);
        });
        const comparisonMonths = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].month === month1) {
            comparisonMonths.push(arr[i - 1]);
            comparisonMonths.push(arr[i]);
          }
        }
        let percentageChange = 0;

        let previousMonthApplied = comparisonMonths[0].jobsApplied;
        let currentMonthApplied = comparisonMonths[1].jobsApplied;
        percentageChange = currentMonthApplied - previousMonthApplied;
        percentageChange = (percentageChange / previousMonthApplied) * 100;
        percentageChange = Math.round(percentageChange);

        setPercentageApplied(percentageChange);
      })
      .catch((err) => console.log(err));
    // http post
  };
  return (
    <>
      <div class="flex">
        <Sidebar />
        <div class="w-screen">
          <Header />
          <div class="h-screen text-white flex">
            {/* CreateJob */}

            <div className=" mainColor mx-5 rounded-md w-full flex flex-col text-left justify-evenly items-center py-1 items center my-5 ">
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Job Creation
              </h1>
              <form
                onSubmit={handleSubmit}
                class="flex flex-col w-9/12 items-center text-left  "
              >
                <div class="flex justify-center w-11/12">
                  <div class="flex flex-col mx-3  w-full">
                    <label class=" flex flex-col text-left w-full">
                      Company Name
                    </label>
                    <input
                      name="companyName"
                      type="text"
                      placeholder="Company Name"
                      class="w-full rounded-md  text-black"
                      onChange={jobHandler}
                    ></input>
                  </div>
                  <div class="flex flex-col w-full">
                    <label class="text-left w-full">Job Role</label>
                    <input
                      type="text"
                      name="jobRole"
                      placeholder="Job Role"
                      class="w-full rounded-md  text-black"
                      onChange={jobHandler}
                    ></input>
                  </div>
                </div>
                <div class="flex justify-center w-11/12">
                  {/* <div class="flex flex-col w-full mx-3">
              <label class="flex flex-col text-left w-full">Date applied</label>
              <input
                type="date"
                name="date"
                placeholder="Date applied"
                class="w-full rounded-md text-black"
                onChange={jobHandler}
              ></input>
            </div> */}
                </div>
                <div class="flex justify-center w-11/12">
                  <div class="flex flex-col mx-3   w-full">
                    <label class="text-left w-full">Notes</label>
                    <input
                      type="text"
                      placeholder="Notes"
                      name="notes"
                      class="w-full rounded-md  text-black"
                      onChange={jobHandler}
                    ></input>
                  </div>
                  <div class="flex flex-col  w-full">
                    <label class="text-left w-full">Recruiter</label>
                    <input
                      type="text"
                      name="recruiter"
                      placeholder="Recruiter"
                      class="w-full rounded-md  text-black"
                      onChange={jobHandler}
                    ></input>
                  </div>
                </div>
                <div class="flex justify-center w-11/12">
                  <div class="flex flex-col mx-3   w-full">
                    <label class="text-left w-full">Status</label>
                    <input
                      type="text"
                      placeholder="Status"
                      name="status"
                      class="w-full rounded-md  text-black"
                      onChange={jobHandler}
                    ></input>
                  </div>
                  <div class="flex flex-col w-full">
                    <label class="text-left w-full">Job Link</label>
                    <input
                      type="text"
                      name="jobLink"
                      placeholder="Job Link"
                      class="w-full rounded-md  text-black"
                      onChange={jobHandler}
                    ></input>
                  </div>
                </div>
                <div class="flex flex-col  w-11/12">
                  <label class="text-left w-full ml-3">Source</label>

                  <input
                    type="text"
                    name="source"
                    placeholder="Source"
                    class=" rounded-md text-black ml-3 "
                    onChange={jobHandler}
                  ></input>
                </div>

                <div class="flex justify-center w-11/12 ">
                  <button
                    class="w-full mt-6 h-11/12 p-2 ml-3 rounded-md"
                    style={{ backgroundColor: "#00d25b" }}
                  >
                    Create Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
