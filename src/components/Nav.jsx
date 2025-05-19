import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";


const Nav = (props) => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
    }
  const { username } = useContext(AuthContext);
  return (
    <div>
      <div className="h-16 w-screen border-b-1 flex justify-between items-center px-6 max-md:px-2 fixed bg-white">
        <Link to={"/"}>
          <h1 className="text-3xl max-md:text-xl mx-2 bg-gradient-to-tr from-[#bdc3c7]  to-[#2c3e50] bg-clip-text text-transparent">
            <i className="ri-todo-line"></i> ToDo List
          </h1>
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-400 text-xl px-2 py-1 rounded-md text-white active:scale-95  max-md:text-lg cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="h-16 w-full"></div>
    </div>
  );
};

export default Nav;
