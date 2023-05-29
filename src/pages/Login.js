import React from "react";

import { useState, useContext } from "react";
import { post } from "../services/authService";
import { LoadingContext } from "../context/load.context";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(LoadingContext);
  const { authenticateUser } = useContext(AuthContext);
  const [loginObject, setLoginObject] = useState({
    email: "",
    password: "",
  });

  const updateState = (e) => {
    setLoginObject({
      ...loginObject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", loginObject)
      .then((response) => {
        localStorage.setItem("authToken", response.data.authToken);

        authenticateUser();
        navigate("/");
      })
      .catch((err) => console.log(err));
    // http post
  };
  return (
    <div class="flex">
      <Sidebar />

      <div class="w-screen">
        <section class="w-full h-screen flex justify-center flex-col items-center ">
          <h1 class="text-center text-white">Login to seek profession</h1>
          <form
            onSubmit={handleSubmit}
            class="flex flex-col w-1/3 shadow-lg shadow-indigo-500/40 text-white w-96 mx-6 p-5"
          >
            <label>Email address</label>
            <input
              type="text"
              placeholder="Email"
              class="w-full mt-1 text-blue-500 "
              value={loginObject.email}
              name="email"
              onChange={updateState}
            ></input>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              class="w-full mt-1 text-blue-500"
              name="password"
              value={loginObject.password}
              onChange={updateState}
            ></input>
            <button class="rounded-none bg-blue-500 w-full mt-6 px-3 py-2">
              Login
            </button>
            {/* <input
            type="checkbox"
            class="appearance-none checked:bg-blue-500 ..."
          />
          <label>I agree to terms and conditions</label> */}
          </form>
          <Link to="/password-request" class="text-white font-bold">
            Forgot password
          </Link>
        </section>
      </div>
    </div>
  );
};
