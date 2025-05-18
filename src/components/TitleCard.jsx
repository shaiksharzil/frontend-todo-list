import React from "react";
import { Link } from "react-router-dom";

const TitleCard = ({ card, onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex flex-col h-40 w-70 border-2 rounded-md max-md:w-80">
        <div className="flex flex-row border-b-2 font-medium">
          <div
            className="group w-1/2 border-r-1 flex flex-row justify-center items-center gap-1 py-2 cursor-pointer"
            onClick={() => onEdit(card)}
          >
            <i className="ri-pencil-fill text-blue-400 transform transition-transform duration-500 group-hover:rotate-360"></i>
            <p>Edit</p>
          </div>
          <div
            className=" group w-1/2 border-l-1 flex flex-row justify-center items-center gap-1 cursor-pointer"
            onClick={() => onDelete(card)}
          >
            <i className="ri-delete-bin-6-line text-red-500 transform transition-transform duration-200 group-hover:-rotate-12"></i>
            <p>Delete</p>
          </div>
        </div>
        <div className="h-full px-3">
          <div className="flex justify-around items-center h-full flex-col">
            <h3 className="text-2xl font-semibold text-center mt-4">
              {card.title}
            </h3>
            <Link to={`/tasks/${card._id}`} className="w-full">
              <button className="flex group justify-center gap-1 border-2 border-black w-full py-1 text-xl rounded-md active:scale-95 cursor-pointer">
                <p>Tasks</p>
                <i className="ri-arrow-right-line transform transition-transform duration-200 group-hover:translate-x-1 text-emerald-500"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TitleCard;
