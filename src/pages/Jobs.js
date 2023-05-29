import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { JobCards } from "../components/JobCards";
import { JobDetails } from "../components/JobDetails";
import { Slogan } from "../components/Slogan";
export const Jobs = () => {
  return (
    <div class="flex text-white">
      {/* Jobs */}
      <Sidebar />
      <div class="w-screen">
        <Header />
        <Slogan />
        <JobCards />
      </div>
    </div>
  );
};
