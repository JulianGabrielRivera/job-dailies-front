import React from "react";
import {
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Bar, XAxis, YAxis } from "recharts";
import { LoadingContext } from "../context/load.context";
import { useContext } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

export const JobChart = () => {
  const { jobs, setUser, user, months } = useContext(LoadingContext);
  const isMobile = useMediaQuery();

  const data = [
    { name: "January", Applied: 400, Rejected: 2000 },
    { name: "February", Applied: 600, Rejected: 3133 },
    { name: "March", Applied: 800, Rejected: 1500 },
    { name: "April", Applied: 800, Rejected: 1500 },
    { name: "May", Applied: 800, Rejected: 1500 },
    { name: "June", Applied: 800, Rejected: 1500 },
    { name: "July", Applied: 800, Rejected: 1500 },
    { name: "August", Applied: 800, Rejected: 1500 },
    { name: "September", Applied: 800, Rejected: 1500 },
    { name: "October", Applied: 800, Rejected: 1500 },
    { name: "November", Applied: 800, Rejected: 1500 },
    { name: "December", Applied: 800, Rejected: 1500 },
  ];
  let count = 0;
  const monthsArray = user?.jobs.forEach((job) => {
    if (job.month === "May") {
      count = count + 1;
      data.splice(4, 1, { name: "May", Applied: count, Rejected: 1500 });
    }
    if (job.month === "June") {
      count = count + 1;

      data.splice(5, 1, { name: "June", Applied: count, Rejected: 1500 });
    }
  });

  // const data = [
  //   { name: "January", Applied: 400, Rejected: 2000 },
  //   { name: "February", Applied: 600, Rejected: 3133 },
  //   { name: "March", Applied: 800, Rejected: 1500 },
  //   { name: "April", Applied: 800, Rejected: 1500 },
  //   { name: "May", Applied: 800, Rejected: 1500 },
  //   { name: "June", Applied: 800, Rejected: 1500 },
  //   { name: "July", Applied: 800, Rejected: 1500 },
  //   { name: "August", Applied: 800, Rejected: 1500 },
  //   { name: "September", Applied: 800, Rejected: 1500 },
  //   { name: "October", Applied: 800, Rejected: 1500 },
  //   { name: "November", Applied: 800, Rejected: 1500 },
  //   { name: "December", Applied: 800, Rejected: 1500 },
  // ];
  // const monthsToShow = data.slice(3, 7);
  // console.log(monthsToShow);
  return (
    <>
      {isMobile ? (
        <div className=" mx-5 rounded-md  mainColor flex flex-col text-center justify-between py-1 items center my-5 ">
          <h2>Job Stats:</h2>

          <ResponsiveContainer width="99%" margin={10} height={150}>
            {/* <ResponsiveContainer width="100%"> */}
            <BarChart
              width={300}
              height={600}
              data={months}
              padding={10}
              style={{ fontSize: "10px" }}
            >
              {/* <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} /> */}
              <XAxis dataKey="month" style={{ fontSize: "12px" }} />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="jobsApplied" barSize={30} fill="#8884d8" />
              <Bar dataKey="jobsRejected" barSize={50} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className=" mx-5 rounded-md w-11/12  mainColor flex flex-col text-center justify-between py-1 items center my-5 ">
          <h2>Job Stats:</h2>

          <ResponsiveContainer width="99%" margin={10} height={150}>
            {/* <ResponsiveContainer width="100%"> */}
            <BarChart
              width={300}
              height={600}
              data={months}
              padding={10}
              style={{ fontSize: "10px" }}
            >
              {/* <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} /> */}
              <XAxis dataKey="month" style={{ fontSize: "12px" }} />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="jobsApplied" barSize={30} fill="#8884d8" />
              <Bar dataKey="jobsRejected" barSize={50} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};
