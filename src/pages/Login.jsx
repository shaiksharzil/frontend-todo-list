import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const Url = import.meta.env.VITE_URL;
  const [passType, setPassType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${Url}/login`, { username, password });

      if (res.data.message === "Success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        login(res.data.username);
        navigate("/", { state: { showWelcome: true } });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setPassType(passType === "password" ? "text" : "password");
  };

  return (
    <div className="h-svh w-screen flex justify-center items-center bg-[#EEEEEE]">
      <ToastContainer theme="colored" position="top-center" />
      <div className="p-3 bg-white rounded-xl w-64">
        <h2 className="text-center font-bold text-3xl pb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Username:</h3>
            <input
              type="text"
              placeholder="Enter username"
              className="bg-[#EEEEEE] rounded-md focus:outline-none pl-2 h-8 mb-2 w-full"
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
            />
          </div>
          <div className="mb-3">
            <h3>Password:</h3>
            <div className="relative">
              <input
                type={passType}
                placeholder="Enter password"
                className="bg-[#EEEEEE] rounded-md focus:outline-none pl-2 pr-10 h-8 w-full"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passType === "password" ? (
                <i
                  onClick={togglePasswordVisibility}
                  className="ri-eye-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={togglePasswordVisibility}
                  className="ri-eye-off-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                ></i>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-emerald-400 w-full rounded-md h-8 hover:bg-emerald-500 active:scale-95 font-medium text-xl text-white mb-2 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 cursor-pointer">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
