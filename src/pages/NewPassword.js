import React from "react";
import { useState, useEffect } from "react";
import { get, post } from "../services/authService";
import { useParams, useNavigate } from "react-router-dom";

export const NewPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const param = useParams();
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  console.log(password);
  const onSubmitNewPassword = (e) => {
    e.preventDefault();
    post(`/auth/password/${param.id}/${param.token}`, { password })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((err) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    get(`/auth/password/${param.id}/${param.token}`).then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <div class="text-white flex flex-col h-screen justify-center items-center">
      <form
        class="flex flex-col w-1/3 shadow-lg shadow-indigo-500/40 text-white h-72 w-96 mx-6 p-5 justify-between"
        onSubmit={onSubmitNewPassword}
      >
        <h1 class="text-center">Password Reset</h1>
        <p>Enter your new password. Password must be at least 8 characters.</p>
        <div>
          <label>Password:</label>
          <input
            class="w-full mt-1 text-blue-500"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handlePassword}
          />
        </div>
      </form>
    </div>
  );
};
