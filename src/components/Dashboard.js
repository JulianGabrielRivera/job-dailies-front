import React from "react";
import { DashBoardGrid } from "./DashBoardGrid";
import { JobChart } from "./JobChart";
import { TopJobsChart } from "./TopJobsChart";
import { JobCard } from "./JobCards";
import useMediaQuery from "../hooks/useMediaQuery";
import { DashBoardGrid2 } from "./DashBoardGrid2";
import { Slogan } from "./Slogan";
import { LoadingContext } from "../context/load.context";
import { useContext, useEffect } from "react";
import { get } from "../services/authService";

export const Dashboard = () => {
  const isMobile = useMediaQuery();
  const {
    jobs,
    user,
    months,
    sumOfAll,
    sumOfRejectedAll,
    jobsPerDay,
    totalJobs,
    setMonths,
    setUser,
    setJobs,
    setPercentageApplied,
    percentageApplied,
    setPercentageRejected,
    setPercentageFollowUp,
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
  useEffect(() => {
    // do i want it to stop a network request here  by using setstate and updating numbers that way?
    // if (!user || !months || !jobs)
    if (!jobs || !months)
      get("/jobs/all-jobs").then((response) => {
        console.log(response.data);
        // setUser(response.data.allJobs[0]);
        // console.log(response.data.allJobs[0].jobs.reverse());
        setJobs(response.data.allJobs[0].jobs.reverse());
        setMonths(response.data.months);
        let newDate = new Date();
        let optionsThree = {
          month: "long",
        };
        let month1 = newDate.toLocaleString("en-US", optionsThree);
        console.log(month1);

        const current = new Date();
        current.setMonth(current.getMonth() - 1);
        const prev = current.toLocaleString("default", { month: "long" });
        console.log(prev);

        const arr = response.data.months.sort(function (a, b) {
          return TwelveMonths.indexOf(a.month) - TwelveMonths.indexOf(b.month);
        });
        const comparisonMonths = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].month === month1 || arr[i].month === prev) {
            comparisonMonths.push(arr[i]);
          }
        }
        let percentageChange = 0;
        let followUpPercentage = 0;
        let previousMonthApplied = comparisonMonths[0].jobsApplied;
        let currentMonthApplied = comparisonMonths[1].jobsApplied;
        percentageChange = currentMonthApplied - previousMonthApplied;
        percentageChange = (percentageChange / previousMonthApplied) * 100;
        percentageChange = Math.round(percentageChange);
        let rejectedPercentageChange = 0;
        let previousMonthRejected = comparisonMonths[0].jobsRejected;
        let currentMonthRejected = comparisonMonths[1].jobsRejected;
        rejectedPercentageChange = currentMonthRejected - previousMonthRejected;
        rejectedPercentageChange =
          (rejectedPercentageChange / previousMonthRejected) * 100;
        rejectedPercentageChange = Math.round(rejectedPercentageChange);
        console.log(rejectedPercentageChange);
        let prevFollowUps = comparisonMonths[0].jobsFollowedUp;
        let currentFollowUps = comparisonMonths[1].jobsFollowedUp;
        followUpPercentage = currentFollowUps - prevFollowUps;
        followUpPercentage = (followUpPercentage / prevFollowUps) * 100;
        followUpPercentage = Math.round(followUpPercentage);
        setPercentageFollowUp(followUpPercentage);
        setPercentageRejected(rejectedPercentageChange);
        setPercentageApplied(percentageChange);
      });
  }, []);

  return (
    <div className="flex flex-col my-7  " style={{ width: "99%" }}>
      <Slogan />
      <DashBoardGrid />
      {isMobile ? (
        <div className="flex flex-col justify-center ">
          <JobChart />
          <TopJobsChart />
        </div>
      ) : (
        <div className="flex justify-center mx-1 ">
          <JobChart />
          <TopJobsChart />
        </div>
      )}
      <DashBoardGrid2 />
    </div>
  );
};
