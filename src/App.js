import "./index.css";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { CreateJob } from "./pages/CreateJob";
import { EditJob } from "./pages/EditJob";
import { DailyGoals } from "./pages/DailyGoals";
import { Header } from "./components/Header";
import { Jobs } from "./pages/Jobs";
import { ResetPassword } from "./pages/ResetPassword";
import { NewPassword } from "./pages/NewPassword";
import { AccountSettings } from "./pages/AccountSettings";
function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const LoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <div>
      {/* <Navbar /> */}

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}

        <Route element={<LoggedOut />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedIn />}>
          <Route path="/" element={<Home />} />

          <Route path="/jobs" element={<Jobs />} />
          <Route path="/createJob" element={<CreateJob />}></Route>
          <Route path="/editJob/:id" element={<EditJob />}></Route>
          <Route path="/dailygoals" element={<DailyGoals />}></Route>
          <Route path="/settings" element={<AccountSettings />}></Route>
        </Route>
        <Route path="/password-request" element={<ResetPassword />}></Route>
        <Route
          path="/auth/password/:id/:token"
          element={<NewPassword />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
