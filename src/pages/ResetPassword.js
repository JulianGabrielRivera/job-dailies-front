import React from "react";
import { useState } from "react";
import { post } from "../services/authService";
export const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailUpdate = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await post("/auth/password-link", { email });
      console.log(data);
    } catch (error) {
      console.log(error);
      //   if (
      //     error.response &&
      //     error.response.status >= 400 &&
      //     error.response.status <= 500
      //   ) {
      //     setError(error.response.data.message);
      //     setMsg("");
      //   }
    }
  };
  return (
    <div class="text-white flex flex-col h-screen justify-center items-center">
      <form
        class="flex flex-col w-1/3 shadow-lg shadow-indigo-500/40 text-white h-72 w-96 mx-6 p-5 justify-between"
        onSubmit={handleSubmit}
      >
        <h1 class="text-center">Request Password Reset</h1>
        <p>
          Enter your account email and we'll send you a link to reset your
          password if an account with that email exists:
        </p>
        <div>
          <label>Email:</label>
          <input
            class="w-full mt-1 text-blue-500"
            name="email"
            type="text"
            placeholder="Enter your email"
            onChange={handleEmailUpdate}
          ></input>
        </div>

        <button class="bg-blue-500 px-3 py-2">Request Password Reset</button>
      </form>
    </div>
  );
};
