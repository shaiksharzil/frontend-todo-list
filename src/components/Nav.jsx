import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";


const Nav = (props) => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
    }
    const {username} = useContext(AuthContext);

  return (
    <div>
      <div className="h-16 w-full border-b-1 flex justify-between items-center px-6 max-md:px-2 fixed bg-white">
        <h1 className="text-3xl max-md:text-xl">Welcome {username}</h1>
        <button
          onClick={logout}
          className="bg-red-400 hover:bg-red-500 text-xl px-2 py-1 rounded-md text-white active:scale-95  max-md:text-lg"
        >
          Logout
        </button>
      </div>
      <div className="h-16 w-full"></div>
    </div>
  );
};

export default Nav;
