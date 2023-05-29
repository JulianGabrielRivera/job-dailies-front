import { useEffect, useState, createContext } from "react";
import { get, post } from "../services/authService";
import axios from "axios";
import hoodie from "../assets/images/hoodie.png";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [jobs, setJobs] = useState([]);
  const [months, setMonths] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [percentageApplied, setPercentageApplied] = useState(0);
  const [percentageRejected, setPercentageRejected] = useState(0);
  const [percentageFollowUp, setPercentageFollowUp] = useState(0);
  const [image, setImage] = useState(hoodie);
  console.log(image);
  const setTimedMessage = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const sumOfAll = () => {
    let initialValue = 0;
    months?.forEach((month) => {
      initialValue = month.jobsApplied + initialValue;
    });
    return initialValue;
  };
  const sumOfRejectedAll = () => {
    let totalRejected = 0;
    months?.forEach((month) => {
      totalRejected = month.jobsRejected + totalRejected;
    });
    console.log(totalRejected);
    return totalRejected;
  };
  const jobsPerDay = () => {
    let daysAppliedPerMonth = 0;
    months?.forEach((month) => {
      daysAppliedPerMonth = month.daysApplied + daysAppliedPerMonth;
    });

    return sumOfAll() / daysAppliedPerMonth;
  };
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
      console.log(arr);
      const comparisonMonths = [];
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        if (arr[i].month === month1 || arr[i].month === prev) {
          comparisonMonths.push(arr[i]);
        }
      }
      let percentageChange = 0;
      let followUpPercentage = 0;
      let rejectedPercentageChange = 0;
      let previousMonthApplied = comparisonMonths[0].jobsApplied;
      let currentMonthApplied = comparisonMonths[1].jobsApplied;
      percentageChange = currentMonthApplied - previousMonthApplied;
      percentageChange = (percentageChange / previousMonthApplied) * 100;
      percentageChange = Math.round(percentageChange);
      let prevFollowUps = comparisonMonths[0].jobsFollowedUp;
      let currentFollowUps = comparisonMonths[1].jobsFollowedUp;

      followUpPercentage = currentFollowUps - prevFollowUps;
      followUpPercentage = (followUpPercentage / prevFollowUps) * 100;
      followUpPercentage = Math.round(followUpPercentage);
      setPercentageFollowUp(followUpPercentage);

      let previousMonthRejected = comparisonMonths[0].jobsRejected;
      let currentMonthRejected = comparisonMonths[1].jobsRejected;
      rejectedPercentageChange = currentMonthRejected - previousMonthRejected;
      rejectedPercentageChange =
        (rejectedPercentageChange / previousMonthRejected) * 100;
      rejectedPercentageChange = Math.round(rejectedPercentageChange);
      setPercentageRejected(rejectedPercentageChange);
      setPercentageApplied(percentageChange);
    });
  }, []);
  console.log(percentageFollowUp);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        message,
        user,
        months,
        setIsLoading,
        setMessage,
        setUser,
        setTimedMessage,
        setJobs,
        jobs,
        sumOfAll,
        sumOfRejectedAll,
        jobsPerDay,
        totalJobs,
        setMonths,
        percentageApplied,
        setPercentageApplied,
        percentageRejected,
        setPercentageRejected,
        image,
        percentageFollowUp,
        setPercentageFollowUp,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
