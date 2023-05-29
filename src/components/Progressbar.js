import React from "react";
import { useState, useEffect } from "react";

export const Progressbar = ({ job }) => {
  const [filled, setFilled] = useState(0);
  // const handleFill = () => {
  //   if (filled < 100 && job.emailFollowUp === true) {
  //     setFilled((prevFilled) => prevFilled + 25);
  //   }
  // };
  useEffect(() => {
    let id = setInterval(() => {
      clearInterval(id);
      console.log("hi");
      if (job) {
        setFilled((prevFilled) => prevFilled + 20);
      }
      if (job.emailFollowUp === true) {
        setFilled((prevFilled) => prevFilled + 20);
      }
      if (job.phoneFollowUp === true) {
        setFilled((prevFilled) => prevFilled + 20);
      }
      if (job.inPersonFollowUp === true) {
        setFilled((prevFilled) => prevFilled + 20);
      }
      if (job.notes.length > 20) {
        setFilled((prevFilled) => prevFilled + 20);
      }
    }, 300);
    // return () => clearInterval(id);
  }, []);
  console.log(filled);
  return (
    <div className="progressBar">
      <div
        style={{
          width: `${filled}%`,
          backgroundColor: "green",
          height: "100%",
          transition: "width 1.5s",
        }}
      >
        <span
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            fontSize: "12px",
          }}
        >
          {filled}%
        </span>
      </div>
    </div>
  );
};
