import React from "react";
import { get, post } from "../services/authService";
import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../context/load.context";

export const Slogan = () => {
  const [companyName, setCompanyName] = useState("");
  const { jobs, setUser, user, setJobs, setMonths, setPercentageRejected } =
    useContext(LoadingContext);

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  console.log(companyName);
  //   useEffect(() => {

  //   }, []);
  return (
    <div
      style={{ height: "100px" }}
      class="mx-6 my-5 slogan rounded-md bg-blue-500  "
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          post("/jobs/search", { companyName })
            .then((response) => {
              //   console.log(response.data.reverse());
              setJobs(response.data.reverse());
              console.log(jobs);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <p class="mt-7 ml-4 w-2/5 rounded-md text-white">
          You are what you repeatedly do every day
        </p>
      </form>

      {/* <h1 class="mx-4 ">You are what you repeatedly do everyday</h1> */}
    </div>
  );
};
