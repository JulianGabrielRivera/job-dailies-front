import React from "react";
import { useState } from "react";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Signup = () => {
  const navigate = useNavigate();
  const [signUpObject, setSignUpObject] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState("");

  const updateState = (e) => {
    setSignUpObject({
      ...signUpObject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", {
      signUpObject: signUpObject,
      profileImage: profileImage,
    })
      .then((createdUser) => {
        console.log(createdUser);
        navigate("/login");
      })
      .catch((err) => console.log(err));
    // http post
  };
  const handleFileUpload = (e) => {
    // setIsUploading(true); // set isUploading to true
    // console.log("Uploading photo...");
    const uploadData = new FormData();
    uploadData.append("profilePicture", e.target.files[0]);
    console.log("FILE LIST", e.target.files.length);
    // if (e.target.files.length) {
    post("/auth/profile-pic", uploadData)
      .then((result) => {
        setProfileImage(result.data.profileImage);
        console.log("This is photo", result.data);
      })
      .catch((err) => {
        console.log("Upload error", err);
      });
    // .finally(() => {
    //   setIsUploading(false); // set isUploading to false after the upload is complete
    // });
    // }
  };

  return (
    <>
      <div class="flex">
        <Sidebar />

        <div class="w-screen">
          <section class="w-full h-screen flex justify-center flex-col items-center ">
            <h1 class="text-center text-white">Create your account</h1>
            <form
              onSubmit={handleSubmit}
              class="flex flex-col w-1/3   shadow-lg shadow-indigo-500/40 text-white w-96 mx-6 p-5"
            >
              <label>Email address</label>
              <input
                type="text"
                placeholder="Email"
                class="w-full mt-1 text-blue-500 "
                name="email"
                value={signUpObject.email}
                onChange={updateState}
              ></input>
              <label>First name</label>
              <input
                type="text"
                placeholder="First name"
                class="w-full mt-1 text-blue-500 "
                name="firstName"
                value={signUpObject.firstName}
                onChange={updateState}
              ></input>
              <label>Last name</label>
              <input
                type="text"
                placeholder="Last name"
                class="w-full mt-1 text-blue-500 "
                name="lastName"
                value={signUpObject.lastName}
                onChange={updateState}
              ></input>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                class="w-full mt-1 text-blue-500"
                onChange={updateState}
                name="password"
                value={signUpObject.password}
              ></input>
              <label>Profile Picture</label>
              <input
                onChange={handleFileUpload}
                type="file"
                name="profilePicture"
              ></input>
              <button class="rounded-none bg-blue-500 w-full mt-6 px-3 py-2">
                Sign up
              </button>
              {/* <input
            type="checkbox"
            class="appearance-none checked:bg-blue-500 ..."
          />
          <label>I agree to terms and conditions</label> */}
            </form>
          </section>
        </div>
      </div>
    </>
  );
};
