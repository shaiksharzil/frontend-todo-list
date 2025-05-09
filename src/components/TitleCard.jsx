// titlecard.jsx
import React from "react";
import { Link } from "react-router-dom";

const TitleCard = ({ card, onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex flex-col h-40 w-70 border-2 rounded-md cursor-pointer max-md:w-80">
        <div className="flex flex-row border-b-2 font-medium">
          <div
            className="w-1/2 border-r-1 flex flex-row justify-center items-center gap-1"
            onClick={() => onEdit(card)}
          >
            <div className="text-emerald-400">
              <i className="ri-edit-2-fill"></i>
            </div>
            <p>Edit</p>
          </div>
          <div
            className="w-1/2 border-l-1 flex flex-row justify-center items-center gap-1"
            onClick={() => onDelete(card)}
          >
            <div className="text-red-500">
              <i className="ri-delete-bin-6-fill"></i>
            </div>
            <p>Delete</p>
          </div>
        </div> 
        <Link to={`/tasks/${card._id}`} className="h-full hover:underline">
          <div className="flex justify-center items-center h-full flex-col">
            <h3 className="text-2xl font-semibold">{card.title}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};


export default TitleCard;
