import React, { useEffect } from "react";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import PinnedTasks from "./pages/PinnedTasks";
import CompletedTasks from "./pages/CompletedTasks";
import OngoingTasks from "./pages/OngoingTasks";
import { Routes, Route, useNavigate } from "react-router-dom";
import { authActions } from "./store/auth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";
const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (
      isLoggedIn === false &&
      window.location.pathname !== "/verify-email"
    ) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="bg-[#F9F9F9] text-#333 md:h-[100%] p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/PinnedTasks" element={<PinnedTasks />} />
          <Route path="/CompletedTasks" element={<CompletedTasks />} />
          <Route path="/OngoingTasks" element={<OngoingTasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
