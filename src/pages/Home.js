import React from "react";
import { Dashboard } from "../components/Dashboard";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Slogan } from "../components/Slogan";
export const Home = () => {
  return (
    <div class=" text-white flex  ">
      <Sidebar />
      <div className="w-screen">
        <Header />

        <Dashboard />
      </div>
    </div>
  );
};
