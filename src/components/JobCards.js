import React from "react";
import { JobDetails } from "./JobDetails";
import { LoadingContext } from "../context/load.context";
import { useContext, useEffect, useState, useRef } from "react";
import { get, post } from "../services/authService";
import { RxCross2 } from "react-icons/rx";
import useMediaQuery from "../hooks/useMediaQuery";
import { MdEditNote } from "react-icons/md";

export const JobCards = () => {
  const { jobs, setUser, user, setJobs, setMonths, setPercentageRejected } =
    useContext(LoadingContext);
  const [jobDetails, setJobDetails] = useState(null);
  const [edit, setEdit] = useState(false);
  const ref = useRef(null);
  const handleJobClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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
  const [editJob, setEditJob] = useState({
    companyName: "",
    jobRole: "",
    status: "",
    notes: "",
  });

  const isMobile = useMediaQuery();

  const handleJobUpdate = (e) => {
    setEditJob({ ...editJob, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    get(`/jobs/delete-job/${id}`).then((response) => {
      const newJobs = jobs.filter((job) => job._id !== id);
      console.log(newJobs);
      setJobs(newJobs);

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

      let rejectedPercentageChange = 0;
      let previousMonthRejected = comparisonMonths[0].jobsRejected;
      let currentMonthRejected = comparisonMonths[1].jobsRejected;
      rejectedPercentageChange = currentMonthRejected - previousMonthRejected;
      rejectedPercentageChange =
        (rejectedPercentageChange / previousMonthRejected) * 100;
      rejectedPercentageChange = Math.round(rejectedPercentageChange);
      console.log(rejectedPercentageChange);
      setPercentageRejected(rejectedPercentageChange);
    });
  };

  const handleJobDetails = (id) => {
    get(`/jobs/details/${id}`)
      .then((response) => {
        setJobDetails(response.data);
      })
      .catch((err) => console.log(err));
  };
  const handleBooleanToTrue = (id, name) => {
    get(`/jobs/${name}/true/${id}`).then((response) => {
      const newJobs = jobs.map((job) => {
        if (job._id === id) {
          return { ...response.data.findJob };
        } else {
          return { ...job };
        }
      });

      setJobs(newJobs);

      setUser(response.data.updatedUser);
    });
  };
  const handleBooleanToFalse = (id, name) => {
    get(`/jobs/${name}/false/${id}`).then((response) => {
      const newJobs = jobs.map((job) => {
        if (job._id === id) {
          return { ...response.data.findJob };
        } else {
          return { ...job };
        }
      });
      setJobs(newJobs);

      setUser(response.data.updatedUser);
    });
  };
  const handleTrueEdit = (id) => {
    post(`/jobs/edit/true/${id}`)
      .then((response) => {
        const newJobs = jobs.map((job) => {
          if (job._id === id) {
            return { ...response.data.updateEdit };
          } else {
            return { ...job };
          }
        });
        setJobs(newJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFalseEdit = (id, job) => {
    post(`/jobs/edit/false/${id}`, { editJob: editJob, job: job })
      .then((response) => {
        const newJobs = jobs.map((job) => {
          if (job._id === id) {
            return { ...response.data.updateEdit };
          } else {
            return { ...job };
          }
        });
        setJobs(newJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isMobile ? (
        <div class="flex flex-col-reverse items-center justify-between ">
          <div class=" w-full  minWidth">
            {jobs &&
              jobs?.map((job) => {
                return (
                  <>
                    <div
                      key={job._id}
                      class=" mx-5 h-80 rounded-md mainColor flex flex-col mb-4 "
                    >
                      <div
                        onClick={() => {
                          handleJobDetails(job._id);
                        }}
                      >
                        Details
                      </div>
                      <div class="flex justify-end mr-2 mt-2 ">
                        <MdEditNote
                        // onClick={() => {
                        //   setEdit(!edit);
                        // }}
                        />

                        <div onClick={() => handleDelete(job._id)}>
                          <RxCross2 />
                        </div>
                      </div>

                      <article class=" ml-3 w-80  ">
                        <h2>Company Name:{job.companyName}</h2>
                        <p>Job Role</p>

                        <p>Date applied</p>
                        <p>Status:</p>

                        <p>Source</p>

                        <p>Recruiter</p>
                        <div class="flex justify-between">
                          <div>
                            <p class="w-5/5">Phone Follow up?</p>
                          </div>
                          <div class="flex  items-center w-2/5">
                            {/* {job.followUp === false} */}
                            <label>Yes</label>
                            {job.phoneFollowUp === true ? (
                              <input
                                disabled
                                onClick={() => {
                                  handleBooleanToTrue(
                                    job?._id,
                                    "phoneFollowUp"
                                  );
                                }}
                                type="checkbox"
                                checked={
                                  job.phoneFollowUp === true ? "checked" : ""
                                }
                              ></input>
                            ) : (
                              <input
                                onClick={() => {
                                  handleBooleanToTrue(
                                    job?._id,
                                    "phoneFollowUp"
                                  );
                                }}
                                type="checkbox"
                                checked={
                                  job.phoneFollowUp === true ? "checked" : ""
                                }
                              ></input>
                            )}

                            <label>No</label>
                            {job.phoneFollowUp === false ? (
                              <input
                                disabled
                                onClick={() => {
                                  handleBooleanToFalse(
                                    job._id,
                                    "phoneFollowUp"
                                  );
                                }}
                                type="checkbox"
                                checked={
                                  job.phoneFollowUp === false ? "checked" : ""
                                }
                              ></input>
                            ) : (
                              <input
                                // disabled
                                onClick={() => {
                                  handleBooleanToFalse(
                                    job._id,
                                    "phoneFollowUp"
                                  );
                                }}
                                type="checkbox"
                                checked={
                                  job.phoneFollowUp === false ? "checked" : ""
                                }
                              ></input>
                            )}
                          </div>
                        </div>
                        <div class="flex justify-between">
                          <div>
                            <p class="w-5/5"> Email Follow up?</p>
                          </div>
                          <div class="flex items-center w-2/5">
                            {/* {job.followUp === false} */}
                            <label>Yes</label>
                            {job.emailFollowUp === true ? (
                              <input
                                onClick={() => {
                                  handleBooleanToTrue(
                                    job?._id,
                                    "emailFollowUp"
                                  );
                                }}
                                disabled
                                type="checkbox"
                                checked={
                                  job.emailFollowUp === true ? "checked" : ""
                                }
                              ></input>
                            ) : (
                              <input
                                onClick={() => {
                                  handleBooleanToTrue(
                                    job?._id,
                                    "emailFollowUp"
                                  );
                                }}
                                type="checkbox"
                                checked={
                                  job.emailFollowUp === true ? "checked" : ""
                                }
                              ></input>
                            )}

                            <label>No</label>
                            {job.emailFollowUp === false ? (
                              <input
                                onClick={() => {
                                  handleBooleanToFalse(
                                    job?._id,
                                    "emailFollowUp"
                                  );
                                }}
                                disabled
                                type="checkbox"
                                checked={
                                  job.emailFollowUp === false ? "checked" : ""
                                }
                              ></input>
                            ) : (
                              <input
                                onClick={() => {
                                  handleBooleanToFalse(
                                    job?._id,
                                    "emailFollowUp"
                                  );
                                }}
                                type="checkbox"
                                checked={
                                  job.emailFollowUp === false ? "checked" : ""
                                }
                              ></input>
                            )}
                          </div>
                        </div>
                        <div class="flex justify-between w-5/5">
                          <div>
                            <p> In Person Follow up?</p>
                          </div>
                          <div class="flex items-center w-2/5">
                            {/* {job.followUp === false} */}
                            <label>Yes</label>
                            {job.inPersonFollowUp === false ? (
                              <input
                                onClick={() => {
                                  handleBooleanToTrue(
                                    job._id,
                                    "inPersonFollowUp"
                                  );
                                }}
                                disabled
                                type="checkbox"
                                checked={
                                  job.inPersonFollowUp === true ? "checked" : ""
                                }
                              ></input>
                            ) : (
                              <input
                                onClick={() => {
                                  handleBooleanToTrue(
                                    job._id,
                                    "inPersonFollowUp"
                                  );
                                }}
                                type="checkbox"
                                checked={
                                  job.inPersonFollowUp === true ? "checked" : ""
                                }
                              ></input>
                            )}

                            <label>No</label>
                            {job.inPersonFollowUp === false ? (
                              <input
                                onClick={() => {
                                  handleBooleanToFalse(
                                    job._id,
                                    "inPersonFollowUp"
                                  );
                                }}
                                disabled
                                type="checkbox"
                                checked={
                                  job.inPersonFollowUp === false
                                    ? "checked"
                                    : ""
                                }
                              ></input>
                            ) : (
                              <input
                                onClick={() => {
                                  handleBooleanToFalse(
                                    job._id,
                                    "inPersonFollowUp"
                                  );
                                }}
                                type="checkbox"
                                checked={
                                  job.inPersonFollowUp === false
                                    ? "checked"
                                    : ""
                                }
                              ></input>
                            )}
                          </div>
                        </div>

                        <div>
                          <a href="">Link to job</a>
                        </div>
                      </article>
                      <p class="text-center">Notes</p>
                    </div>
                  </>
                );
              })}
            {user?.jobs.length === 0 && <p class="text-white">no jobs</p>}
          </div>
          {/* <div>
            <JobDetails jobDetails={jobDetails} />
          </div> */}
        </div>
      ) : (
        <div class="flex justify-between w-full text-[14px]">
          <div class=" w-2/5 ml-6 h-full">
            {jobs?.map((job) => {
              return (
                <div key={job._id}>
                  <div
                    key={job._id}
                    class="w-full h-3/5 rounded-md mainColor flex flex-col mb-4 "
                  >
                    <div key={job._id} class="flex justify-between mx-3 mt-2 ">
                      <div>
                        <button
                          onClick={() => {
                            handleJobDetails(job._id);
                            handleJobClick();
                          }}
                          class="bg-blue-500 rounded-md w-28 "
                        >
                          Details
                        </button>
                      </div>
                      <div class="flex">
                        <MdEditNote onClick={() => handleTrueEdit(job?._id)} />
                        <RxCross2 onClick={() => handleDelete(job?._id)} />
                      </div>
                    </div>

                    <article class=" ml-3 mt-10 flex flex-col justify-between h-96 ">
                      {job.edit ? (
                        <div class="flex justify-around">
                          <label class="w-3/5">Company Name: </label>
                          <input
                            onChange={handleJobUpdate}
                            class="rounded-md w-2/5 h-7 p-1 mr-3 text-black"
                            name="companyName"
                            // value={job.companyName}
                          ></input>
                        </div>
                      ) : (
                        <div class="flex justify-around">
                          <label class="w-3/5">Company Name: </label>
                          <input
                            onChange={handleJobUpdate}
                            disabled={true}
                            class="rounded-md w-2/5 text-white mainColor"
                            name="companyName"
                            value={job.companyName}
                          ></input>
                        </div>
                      )}
                      {job.edit ? (
                        <div class="flex justify-around">
                          <label class="w-3/5">Job Role: </label>
                          <input
                            onChange={handleJobUpdate}
                            class="rounded-md w-2/5 h-7 p-1 mr-3 text-black"
                            name="jobRole"
                            value={
                              editJob.jobRole ? editJob.jobRole : job.jobRole
                            }
                          ></input>
                        </div>
                      ) : (
                        <div class="flex justify-around">
                          <label class="w-3/5">Job Role: </label>
                          <input
                            onChange={handleJobUpdate}
                            disabled={true}
                            class="rounded-md w-2/5 text-white mainColor"
                            name="jobRole"
                            value={job.jobRole}
                          ></input>
                        </div>
                      )}
                      {/* <label>Date applied: </label>
                        <input
                          class="rounded-md w-11/12 text-white mainColor"
                          name="date"
                          value={job.date}
                        ></input> */}
                      {job.edit ? (
                        <div class="flex justify-around">
                          <label class="w-3/5">Status:</label>
                          <input
                            onChange={handleJobUpdate}
                            class="rounded-md w-2/5 h-7 p-1 mr-3 text-black"
                            name="status"
                            // value={job.status}
                          ></input>
                        </div>
                      ) : (
                        <div class="flex justify-around">
                          <label class="w-3/5">Status:</label>
                          <input
                            onChange={handleJobUpdate}
                            disabled={true}
                            class="rounded-md w-2/5 text-white mainColor"
                            name="status"
                            value={job.status}
                          ></input>
                        </div>
                      )}

                      {/* <div class="flex justify-around">
                          <label class="w-3/5">Source:</label>
                          <input
                            class="rounded-md w-2/5 text-white mainColor"
                            name="source"
                            value={job.source}
                          ></input>
                        </div> */}
                      {/* <div class="flex justify-around">
                          <label class="w-3/5">Recruiter</label>
                          <input
                            class="rounded-md w-2/5 text-white mainColor"
                            name="recruiter"
                            value={job.recruiter}
                          ></input>
                        </div> */}
                      <div class="flex justify-between">
                        <div>
                          <p class="w-5/5">Phone Follow up?</p>
                        </div>
                        <div class="flex  items-center w-2/5">
                          {/* {job.followUp === false} */}
                          <label>Yes</label>
                          {job.phoneFollowUp === true ? (
                            <input
                              disabled
                              onClick={() => {
                                handleBooleanToTrue(job?._id, "phoneFollowUp");
                              }}
                              type="checkbox"
                              checked={
                                job.phoneFollowUp === true ? "checked" : ""
                              }
                            ></input>
                          ) : (
                            <input
                              onClick={() => {
                                handleBooleanToTrue(job?._id, "phoneFollowUp");
                              }}
                              type="checkbox"
                              checked={
                                job.phoneFollowUp === true ? "checked" : ""
                              }
                            ></input>
                          )}

                          <label>No</label>
                          {job.phoneFollowUp === false ? (
                            <input
                              disabled
                              onClick={() => {
                                handleBooleanToFalse(job._id, "phoneFollowUp");
                              }}
                              type="checkbox"
                              checked={
                                job.phoneFollowUp === false ? "checked" : ""
                              }
                            ></input>
                          ) : (
                            <input
                              // disabled
                              onClick={() => {
                                handleBooleanToFalse(job._id, "phoneFollowUp");
                              }}
                              type="checkbox"
                              checked={
                                job.phoneFollowUp === false ? "checked" : ""
                              }
                            ></input>
                          )}
                        </div>
                      </div>
                      <div class="flex justify-between">
                        <div>
                          <p class="w-5/5"> Email Follow up?</p>
                        </div>
                        <div class="flex items-center w-2/5">
                          {/* {job.followUp === false} */}
                          <label>Yes</label>
                          {job.emailFollowUp === true ? (
                            <input
                              onClick={() => {
                                handleBooleanToTrue(job?._id, "emailFollowUp");
                              }}
                              disabled
                              type="checkbox"
                              checked={
                                job.emailFollowUp === true ? "checked" : ""
                              }
                            ></input>
                          ) : (
                            <input
                              onClick={() => {
                                handleBooleanToTrue(job?._id, "emailFollowUp");
                              }}
                              type="checkbox"
                              checked={
                                job.emailFollowUp === true ? "checked" : ""
                              }
                            ></input>
                          )}

                          <label>No</label>
                          {job.emailFollowUp === false ? (
                            <input
                              onClick={() => {
                                handleBooleanToFalse(job?._id, "emailFollowUp");
                              }}
                              disabled
                              type="checkbox"
                              checked={
                                job.emailFollowUp === false ? "checked" : ""
                              }
                            ></input>
                          ) : (
                            <input
                              onClick={() => {
                                handleBooleanToFalse(job?._id, "emailFollowUp");
                              }}
                              type="checkbox"
                              checked={
                                job.emailFollowUp === false ? "checked" : ""
                              }
                            ></input>
                          )}
                        </div>
                      </div>
                      <div class="flex justify-between w-5/5">
                        <div>
                          <p> In Person Follow up?</p>
                        </div>
                        <div class="flex items-center w-2/5">
                          {/* {job.followUp === false} */}
                          <label>Yes</label>
                          {job.inPersonFollowUp === true ? (
                            <input
                              onClick={() => {
                                handleBooleanToTrue(
                                  job._id,
                                  "inPersonFollowUp"
                                );
                              }}
                              disabled
                              type="checkbox"
                              checked={
                                job.inPersonFollowUp === true ? "checked" : ""
                              }
                            ></input>
                          ) : (
                            <input
                              onClick={() => {
                                handleBooleanToTrue(
                                  job._id,
                                  "inPersonFollowUp"
                                );
                              }}
                              type="checkbox"
                              checked={
                                job.inPersonFollowUp === true ? "checked" : ""
                              }
                            ></input>
                          )}

                          <label>No</label>
                          {job.inPersonFollowUp === false ? (
                            <input
                              onClick={() => {
                                handleBooleanToFalse(
                                  job._id,
                                  "inPersonFollowUp"
                                );
                              }}
                              disabled
                              type="checkbox"
                              checked={
                                job.inPersonFollowUp === false ? "checked" : ""
                              }
                            ></input>
                          ) : (
                            <input
                              onClick={() => {
                                handleBooleanToFalse(
                                  job._id,
                                  "inPersonFollowUp"
                                );
                              }}
                              type="checkbox"
                              checked={
                                job.inPersonFollowUp === false ? "checked" : ""
                              }
                            ></input>
                          )}
                        </div>
                      </div>

                      {/* <label>Link to Job:</label>

                        <input
                          class="rounded-md w-11/12 text-white mainColor"
                          name="jobLink"
                          value={job.jobLink}
                        ></input> */}
                    </article>

                    <p class="text-center mt-5">Notes</p>
                    {job.edit ? (
                      <textarea
                        name="notes"
                        onChange={handleJobUpdate}
                        class="w-11/12 mx-3 h-1/5 text-black"
                      ></textarea>
                    ) : (
                      <textarea
                        onChange={handleJobUpdate}
                        disabled={true}
                        class="w-11/12 mx-3 h-1/5 text-black"
                      ></textarea>
                    )}
                    {job.edit ? (
                      <div class="flex flex-col items-center ">
                        <button
                          onClick={() => handleFalseEdit(job._id, job)}
                          class="bg-blue-500 rounded-md w-2/5 p-2 my-5 "
                        >
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
            {jobs?.length === 0 && <p class="text-white">no jobs</p>}
          </div>
          <div ref={ref} class="w-3/6 mr-6 ">
            <JobDetails jobDetails={jobDetails} />
          </div>
        </div>
      )}
    </>
  );
};
