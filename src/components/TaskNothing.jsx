import React from "react";
import { MdOutlinePlaylistRemove } from "react-icons/md";

const TaskNothing = () => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 mt-20 mb-35">
      <MdOutlinePlaylistRemove className="text-7xl mb-4" />
      <h2 className="text-2xl font-semibold">No tasks available</h2>
      <p className="text-md mt-2 text-center px-4 max-w-sm">
        You haven’t added any tasks for this title yet. Start by entering a task
        in the box above and click “Add Task” to begin.
      </p>
    </div>
  );
};

export default TaskNothing;
