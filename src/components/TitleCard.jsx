import React from "react";
import { Link } from "react-router-dom";

const TitleCard = ({ card, onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex flex-col h-40 w-70 border-2 rounded-md max-md:w-80">
        <div className="flex flex-row border-b-2 font-medium">
          <div
            className="w-1/2 border-r-1 flex flex-row justify-center items-center gap-1 py-2 cursor-pointer"
            onClick={() => onEdit(card)}
          >
            <div className="text-emerald-400">
              <i className="ri-pencil-fill"></i>
            </div>
            <p>Edit</p>
          </div>
          <div
            className="w-1/2 border-l-1 flex flex-row justify-center items-center gap-1 cursor-pointer"
            onClick={() => onDelete(card)}
          >
            <div className="text-red-500">
              <i className="ri-delete-bin-6-line"></i>
            </div>
            <p>Delete</p>
          </div>
        </div>
        <div className="h-full px-3">
          <div className="flex justify-around items-center h-full flex-col">
            <h3 className="text-2xl font-semibold text-center mt-4">
              {card.title}
            </h3>
            <Link to={`/tasks/${card._id}`} className="w-full">
              <button className="flex group justify-center gap-1 bg-blue-500 w-full py-1 text-white text-xl rounded-md hover:bg-blue-400 active:scale-95 cursor-pointer">
                <p>Tasks</p>
                <i className="ri-arrow-right-line transform transition-transform duration-200 group-hover:translate-x-1"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TitleCard;
