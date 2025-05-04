import React from "react";

const TaskList = ({ t, onCheckChange, onDetailsChange, handleDelete }) => {
  return (
    <div className="flex justify-around mt-5">
      <div className="flex flex-row items-center gap-1 border-2 border-[#EEEEEE] w-fit px-2 py-1 mx-5 rounded-md text-xl max-md:text-sm max-md:px-1 max-md:py-0.5 max-md:mx-2">
        <input
          type="checkbox"
          className="h-5 w-5 max-md:h-3 max-md:w-3 cursor-pointer"
          checked={t.checked || false}
          onChange={(e) => onCheckChange(t._id, e.target.checked)}
        />
        <p>{t.task}</p>
        <input
          type="text"
          className="border-1 rounded w-20 max-md:w-15 pl-2"
          placeholder="Details"
          value={t.details || ""}
          onChange={(e) => onDetailsChange(t._id, e.target.value)}
        />
        <div
          onClick={() => handleDelete(t._id)}
          className="p-1 text-white bg-red-500 rounded text-xl font-medium cursor-pointer flex justify-center items-center max-md:text-sm max-md:font-light"
        >
          <i class="ri-delete-bin-6-line"></i>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
