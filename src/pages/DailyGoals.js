import React from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Progressbar } from "../components/Progressbar";
import { useEffect, useState } from "react";
import { get } from "../services/authService";
import useMediaQuery from "../hooks/useMediaQuery";

export const DailyGoals = () => {
  const [todaysGoals, setTodaysGoals] = useState(null);
  const [phoneFollow, setPhoneFollows] = useState(0);
  const [dailyPhoneFollowUp, setDailyPhoneFollowUp] = useState(0);
  const [dailyEmailFollowUp, setDailyEmailFollowUp] = useState(0);
  const [dailyInPersonFollowUp, setDailyInPersonFollowUp] = useState(0);
  const [emailFollow, setEmailFollows] = useState(0);
  const [inPersonFollow, setinPersonFollows] = useState(0);
  const [totalJobsToday, setTotalJobsToday] = useState(0);
  const [dailyJobsApplied, setDailyJobsApplied] = useState(0);
  const isMobile = useMediaQuery();

  const [followUpsPerCompany, setFollowUpsPerCompany] = useState(0);
  const dailyJobGoals = () => {
    get("/jobs/dailygoals").then((response) => {
      console.log(response.data);
      setTotalJobsToday((response.data.length / 10) * 100);
      setDailyJobsApplied(response.data.length);
      setTodaysGoals(response.data);
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].phoneFollowUp === true) {
          setPhoneFollows((phoneFollow) => phoneFollow + 20);
          setDailyPhoneFollowUp((dailyPhoneFollowUp) => dailyPhoneFollowUp + 1);
        }

        if (response.data[i].emailFollowUp === true && emailFollow < 100) {
          setEmailFollows((emailFollow) => emailFollow + 20);
          setDailyEmailFollowUp(
            (setDailyEmailFollowUp) => setDailyEmailFollowUp + 1
          );
        }
        if (response.data[i].inPersonFollowUp === true) {
          setinPersonFollows((inPersonFollow) => inPersonFollow + 20);
          setDailyInPersonFollowUp(
            (setDailyInPersonFollowUp) => setDailyInPersonFollowUp + 1
          );
        }
      }
    });
  };
  useEffect(() => {
    console.log("hi");

    dailyJobGoals();
  }, []);

  const allCompaniesFollowUps = (job) => {
    let count = 0;

    if (job.emailFollowUp === true) {
      count = count + 1;
    }
    if (job.phoneFollowUp === true) {
      count = count + 1;
    }
    if (job.inPersonFollowUp === true) {
      count = count + 1;
    }
    console.log(job);
    return count;
  };

  console.log(phoneFollow, emailFollow, totalJobsToday);
  console.log(followUpsPerCompany);
  return (
    <div class=" text-white flex">
      <Sidebar />
      <div className="w-screen h-full ">
        <Header />

        <h1 class="text-center mt-2">Daily Goals</h1>

        {isMobile ? (
          <div class="flex flex-col h-3/5 mx-5">
            <div className="dailyCards rounded-md">
              <p>
                {dailyJobsApplied >= 10 ? "10/10" : dailyJobsApplied + "/10"}
              </p>
              <h2>Jobs applied today:</h2>
              <CircularProgressbar
                value={totalJobsToday}
                text={totalJobsToday > 100 ? "100%" : `${totalJobsToday}%`}
                strokeWidth={2}
                styles={{
                  path: {
                    // Path color
                    stroke: `rgba(62, 152, 199`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",
                    // Customize transition animation
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    // Rotate the path
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                  trail: {
                    // Trail color
                    stroke: "#d6d6d6",
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",
                    // Rotate the trail
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                }}
              />
            </div>

            <div className="dailyCards rounded-md ">
              <p>
                {dailyPhoneFollowUp >= 5 ? "5/5" : dailyPhoneFollowUp + "/5"}
              </p>
              <h2>Phone follow ups:</h2>
              <CircularProgressbar
                value={phoneFollow}
                text={phoneFollow > 100 ? "100%" : `${phoneFollow}%`}
                strokeWidth={1}
              />
            </div>
            <div className="dailyCards rounded-md">
              <p>
                {dailyEmailFollowUp >= 5 ? "5/5" : dailyEmailFollowUp + "/5"}
              </p>

              <h2>Email follow ups:</h2>
              <CircularProgressbar
                value={emailFollow}
                text={emailFollow > 100 ? "100%" : `${emailFollow}%`}
                strokeWidth={1}
              />
            </div>
            <div className="dailyCards rounded-md">
              <p>
                {dailyInPersonFollowUp >= 5
                  ? "5/5"
                  : dailyInPersonFollowUp + "/5"}
              </p>
              <h2>In person follow ups:</h2>
              <CircularProgressbar
                value={inPersonFollow}
                text={inPersonFollow > 100 ? "100%" : `${inPersonFollow}%`}
                strokeWidth={1}
              />
            </div>
          </div>
        ) : (
          <div class="flex h-3/5 mx-5">
            <div className="dailyCardsTwo rounded-md">
              <p>
                {dailyJobsApplied >= 10 ? "10/10" : dailyJobsApplied + "/10"}
              </p>
              <h2>Jobs applied today:</h2>
              <CircularProgressbar
                value={totalJobsToday}
                text={totalJobsToday > 100 ? "100%" : `${totalJobsToday}%`}
                strokeWidth={2}
                styles={{
                  path: {
                    // Path color
                    stroke: `rgba(62, 152, 199`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",
                    // Customize transition animation
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    // Rotate the path
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                  trail: {
                    // Trail color
                    stroke: "#d6d6d6",
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",
                    // Rotate the trail
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                }}
              />
            </div>

            <div className="dailyCardsTwo rounded-md ">
              <p>
                {dailyPhoneFollowUp >= 5 ? "5/5" : dailyPhoneFollowUp + "/5"}
              </p>
              <h2>Phone follow ups:</h2>
              <CircularProgressbar
                value={phoneFollow}
                text={phoneFollow > 100 ? "100%" : `${phoneFollow}%`}
                strokeWidth={1}
              />
            </div>
            <div className="dailyCardsTwo rounded-md">
              <p>
                {dailyEmailFollowUp >= 5 ? "5/5" : dailyEmailFollowUp + "/5"}
              </p>

              <h2>Email follow ups:</h2>
              <CircularProgressbar
                value={emailFollow}
                text={emailFollow > 100 ? "100%" : `${emailFollow}%`}
                strokeWidth={1}
              />
            </div>
            <div className="dailyCardsTwo rounded-md">
              <p>
                {dailyInPersonFollowUp >= 5
                  ? "5/5"
                  : dailyInPersonFollowUp + "/5"}
              </p>
              <h2>In person follow ups:</h2>
              <CircularProgressbar
                value={inPersonFollow}
                text={inPersonFollow > 100 ? "100%" : `${inPersonFollow}%`}
                strokeWidth={1}
              />
            </div>
          </div>
        )}
        {isMobile ? (
          <div class=" flex  w-full ">
            <div class="w-full flex flex-col">
              <div
                style={{ color: "white", fontSize: "14px" }}
                class="flex flex-col items-center mx-5 rounded-md "
              >
                {todaysGoals?.map((job) => {
                  return (
                    <>
                      <div
                        class="mainColor rounded-md mb-5 w-full"
                        style={{ height: "300px" }}
                      >
                        <div
                          class="mx-5 flex flex-col justify-between "
                          style={{ height: "280px" }}
                        >
                          <div class="flex w-1/5 justify-between">
                            <h3>Company:</h3>
                            <p>{job.companyName}</p>
                          </div>
                          <div class="flex w-1/5 justify-between">
                            <h3>Applied:</h3>
                            <p>{job.companyName ? "Yes" : "No"}</p>
                          </div>
                          <div class="flex w-1/5 justify-between">
                            <h3>Researched:</h3>
                            <p>{job.notes.length > 20 ? "Yes" : "No"}</p>
                          </div>
                          <div class="flex w-1/5 justify-between">
                            <h3>Follow up:</h3>
                            <p>{allCompaniesFollowUps(job) + "/3"}</p>
                          </div>
                          <div class="flex w-2/3 justify-between">
                            <h3>Progress:</h3>
                            <p>
                              <Progressbar job={job} />
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div class=" flex w-full h-screen">
            <table class="table-auto w-full text-left mainColor h-max mx-8 mt-2 rounded-md mainFontColor ">
              <thead class="w-full">
                <tr style={{ color: "white", fontSize: "14px" }}>
                  <th>Company</th>
                  <th>Progress</th>

                  <th>Applied</th>
                  <th>Reseached</th>
                  <th>Follow up</th>
                </tr>
              </thead>
              <tbody class="mx-10">
                {todaysGoals?.map((job) => {
                  return (
                    <>
                      <tr>
                        <td>{job.companyName}</td>
                        <tr>
                          <Progressbar job={job} />
                        </tr>
                        <td>{job.companyName ? "Yes" : "No"}</td>
                        <td>{job.notes.length > 20 ? "Yes" : "No"}</td>

                        <td>{allCompaniesFollowUps(job) + "/3"}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
