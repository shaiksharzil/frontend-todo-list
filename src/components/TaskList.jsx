import React from "react";

const TaskList = ({
  t,
  onCheckChange,
  onDetailsChange,
  setDelPopUp,
  setEditPopUp,
}) => {
  return (
    <div className="flex justify-around mt-5">
      <div className="flex flex-row items-center justify-between gap-2 border-2 border-[#EEEEEE] w-screen px-2 py-1 mx-5 rounded-md text-xl max-md:text-sm max-md:px-1 max-md:py-0.5 max-md:mx-2">
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            className="h-5 w-5 accent-zinc-700  cursor-pointer"
            checked={t.checked || false}
            onChange={(e) => onCheckChange(t._id, e.target.checked)}
          />
          <div className="flex flex-row gap-2">
            {t.task}{" "}
            <div
              className="cursor-pointer"
              onClick={() => {
                setEditPopUp(t);
              }}
            >
              <i className="ri-pencil-fill text-gray-500"></i>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input
            type="text"
            className="border-2 border-[#EEEEEE] focus:outline-none rounded w-25 max-md:w-18 pl-2"
            placeholder="Details"
            value={t.details || ""}
            onChange={(e) => onDetailsChange(t._id, e.target.value)}
          />
          <div
            onClick={() => setDelPopUp(t)}
            className="p-1 text-white bg-red-500 rounded text-xl font-medium cursor-pointer flex justify-center items-center max-md:text-sm max-md:font-light"
          >
            <i className="ri-delete-bin-6-line"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
