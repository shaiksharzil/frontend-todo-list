import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate("");
  const { login } = useContext(AuthContext);
  const Url = import.meta.env.VITE_URL;

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${Url}/signup`, { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.message == "Success") {
          localStorage.setItem("token", res.data.token);
          login(res.data.username);
          setMessage();
          navigate("/");
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="h-svh w-screen flex justify-center items-center bg-[#EEEEEE]">
      <div className="p-3 bg-white rounded-xl w-64">
        <h2 className="text-center font-bold text-3xl pb-3">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>Username:</h3>
            <input
              type="text"
              placeholder="Enter username"
              className="bg-[#EEEEEE] rounded-md focus:outline-none pl-2 h-8 mb-2 w-full"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <h3>Password:</h3>
            <input
              type="password"
              placeholder="Enter password"
              className="bg-[#EEEEEE] rounded-md focus:outline-none pl-2 h-8 mb-3 w-full"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="text-sm text-center text-red-500 mb-1">{message}</p>
          <button
            type="submit"
            className="bg-emerald-400 w-full rounded-md h-8 hover:bg-emerald-500 active:scale-95 font-medium text-xl text-white mb-2"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-center ">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
