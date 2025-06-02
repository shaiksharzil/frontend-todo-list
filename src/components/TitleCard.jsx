import React from "react";
import { Link } from "react-router-dom";

const TitleCard = ({ card, onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex flex-col  w-70 border-2 border-gray-500 rounded-md max-md:w-80">
        <div className="flex flex-row border-b-2 border-gray-500  font-medium">
          <div
            className="group w-1/2 border-r-1 border-gray-500  flex flex-row justify-center items-center gap-1 py-2 cursor-pointer"
            onClick={() => onEdit(card)}
          >
            <i className="ri-pencil-fill bg-gradient-to-b from-emerald-500 to-white bg-clip-text text-transparent transform transition-transform duration-500 group-hover:rotate-360"></i>
            <p className="bg-gradient-to-b from-emerald-500 to-white bg-clip-text text-transparent">
              Edit
            </p>
          </div>
          <div
            className=" group w-1/2 border-l-1 border-gray-500   flex flex-row justify-center items-center gap-1 cursor-pointer"
            onClick={() => onDelete(card)}
          >
            <i className="ri-delete-bin-6-line bg-gradient-to-b from-red-500 to-white bg-clip-text text-transparent transform transition-transform duration-200 group-hover:-rotate-12"></i>
            <p className="bg-gradient-to-b from-red-500 to-white bg-clip-text text-transparent">
              Delete
            </p>
          </div>
        </div>
        <div className="h-full">
          <div className="flex justify-around h-full flex-col px-4">
            <h3 className="uppercase text-center text-2xl font-extralight mt-4 mb-2 break-words w-full bg-gradient-to-b from-[#304352] to-[#d7d2cc] bg-clip-text text-transparent">
              {card.title}
            </h3>
            <p className="bg-gradient-to-bl from-[#304352] to-[#d7d2cc] bg-clip-text text-transparent text-[10px] font-extralight text-right">
              Last Saved:{" "}
              {card.time ? new Date(card.time).toLocaleString() : " "}
            </p>
            <Link to={`/tasks/${card._id}`} className="w-full">
              <button className="flex group justify-center gap-1 bg-gradient-to-r from-[#485563] to-[#29323c] text-white w-full py-1 my-2 text-xl rounded-md active:scale-95 duration-300 cursor-pointer hover:bg-gradient-to-l">
                <p>Tasks</p>
                <i className="ri-arrow-right-line transform transition-transform duration-300 group-hover:translate-x-1.5"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TitleCard;
