import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://taskback-eosin.vercel.app/api/v1/log-in",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className=" h-[98vh] flex items-center justify-center">
      <div className="p-4 w-5/6 md:w-4/6 lg:w-2/6 rounded ">
        <div className="text-2xl font-semibold">LogIn</div>
        <input
          type="username"
          placeholder="username"
          className="border border-[#333] px-3 py-2 my-3 w-full rounded "
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="password"
          placeholder="password"
          className="border border-[#333] px-3 py-2 my-3 w-full rounded "
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <button
            className="bg-[#3399ff] text-[#fff] px-3 py-2 rounded hover:scale-105 hover:cursor-pointer transition-all duration-300"
            onClick={submit}
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-800 hover:text-gray-200">
            Not having an account? Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
