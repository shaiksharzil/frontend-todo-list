import React from "react";
import { Link } from "react-router-dom";

const TitleCard = ({ card }) => {
  return (
    <Link to={`/tasks/${card._id}`}>
      <div className="flex justify-center items-center  h-40 w-70 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500 max-md:min-w-screen">
        <h1 className="text-white font-bold text-2xl">{card.title}</h1>
      </div>
    </Link>
  );
};

export default TitleCard;