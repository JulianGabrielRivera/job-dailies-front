import React from "react";
import { useState, useContext, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { post, get } from "../services/authService";
import { LoadingContext } from "../context/load.context";
import { AuthContext } from "../context/auth.context";

import { useNavigate, Link } from "react-router-dom";

export const AccountSettings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);
  const { user, setUser } = useContext(LoadingContext);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handlePassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const savePassword = () => {
    post("/auth/save-new-password", {
      oldPassword,
      email: user.email,
      newPassword,
    }).then((response) => {
      console.log(response);
      if (response.data.message === "success") {
        setMsg("Password Saved!");
        setToggle(false);
      }
    });
  };

  const changeEmail = (e) => {
    e.preventDefault();

    if (email === "") {
      setEmailToggle(false);
      setEmail(user?.email);
    }

    post("/auth/change-email", { email })
      .then((response) => {
        setEmailToggle(false);
        setUser(response.data.updateUser);
        console.log(response);
      })
      .catch((err) => {
        setEmailToggle(false);

        console.log(err);
      });
  };
  const deleteAccount = async () => {
    try {
      const deletedUser = await get("/auth/delete-profile");
      logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setEmail(user?.email);
  }, [user?.email]);
  return (
    <>
      <div class="flex">
        <Sidebar />
        <div>
          <Header />
          <div class="flex text-white h-screen text-sm">
            <div className=" mainColor mx-5 text-white rounded-md w-full flex flex-col text-left justify-evenly items-center py-1 items center my-5 ">
              <div class="w-2/3 h-2/6 flex flex-col justify-between md:h-1/6">
                <h1 class="font-bold text-xl">Account settings</h1>
                <h3>Email address</h3>

                <div class="flex flex-col h-25 justify-between md:flex-row">
                  {emailToggle ? (
                    <div class="flex flex-col justify-between  items-left md:items-center h-32 md:flex-row md:flex-1 ">
                      <p>Your email address is:</p>
                      <input
                        class="text-black h-4 rounded-md  border-0 p-0 md:p-2 mt-2 md:mt-0 w-fit"
                        type="email"
                        onChange={handleEmail}
                        value={email ? email : ""}
                      ></input>
                      <button
                        onClick={() => {
                          setEmailToggle(!emailToggle);
                        }}
                        class="bg-blue-500 rounded-md p-1 w-1/12 min-w-fit font-bold self-end md:self-center "
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <>
                      <div class="flex flex-col justify-between  items-left md:items-center h-32 md:flex-row md:flex-1">
                        <p>Your email address is:</p>
                        <input
                          disabled={true}
                          class="text-white h-4 rounded-md mainColor border-0 p-0 md:p-2 mt-2 md:mt-0 w-fit"
                          type="email"
                          onChange={handleEmail}
                          value={email}
                        ></input>
                        {emailToggle ? (
                          <form onClick={changeEmail}>
                            <button class="bg-blue-500 rounded-md p-1 w-1/12 font-bold ">
                              Change
                            </button>
                          </form>
                        ) : (
                          <button
                            onClick={() => {
                              setEmailToggle(!emailToggle);
                            }}
                            class="bg-blue-500 rounded-md p-1 w-1/12 min-w-fit font-bold self-end md:self-center"
                          >
                            Change
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {toggle ? (
                <div class="w-2/3 h-2/6 flex flex-col justify-between">
                  <div class="flex justify-between">
                    <h2 class="font-bold text-xl">Password</h2>
                    <button
                      onClick={() => {
                        setToggle(!toggle);
                        setMsg("");
                      }}
                      class="bg-blue-500 rounded-md p-1 w-1/12 min-w-fit font-bold"
                    >
                      Hide
                    </button>
                  </div>
                  <div class="flex justify-between">
                    <div class="flex flex-col w-2/5">
                      <label>New password</label>
                      <input
                        type="password"
                        onChange={handlePassword}
                        class="rounded-md mt-1 text-blue-500"
                      ></input>
                    </div>
                    <div class="flex flex-col w-2/5">
                      <label>Current password</label>
                      <input
                        type="password"
                        onChange={handleOldPassword}
                        class="rounded-md mt-1 text-blue-500"
                      ></input>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <p>Can't remember your current password?</p>
                    <Link to="/password-request">
                      <button class="bg-blue-500 rounded-md p-1 w-1/12 font-bold min-w-fit">
                        Reset
                      </button>
                    </Link>
                  </div>

                  <button
                    onClick={savePassword}
                    class="bg-blue-500 rounded-md p-1 w-1/6 font-bold min-w-fit"
                  >
                    Save password
                  </button>
                </div>
              ) : (
                <>
                  <div class="flex justify-between w-2/3">
                    <h2 class="font-bold text-xl">Change password</h2>
                    <button
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                      class="bg-blue-500 rounded-md p-1 w-1/12 font-bold min-w-fit "
                    >
                      Show
                    </button>
                  </div>

                  {msg ? <p class="w-2/3">{msg}</p> : ""}
                </>
              )}
              <div class="w-2/3 h-1/4 flex flex-col justify-between">
                <h2 class="font-bold text-xl">Delete account</h2>

                <p>
                  Would you like to delete your account? This account contains
                  all your jobs and stats. Deleting your account will remove all
                  the content associated with it.
                </p>

                <button
                  onClick={deleteAccount}
                  class="bg-red-500 rounded-md p-2 w-2/6 font-bold min-w-fit"
                >
                  I want to delete my account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
