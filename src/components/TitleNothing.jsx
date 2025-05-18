import React from "react";
import { TbFolderOff } from "react-icons/tb";

const TitleNothing = () => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500">
      <TbFolderOff className="text-6xl mb-4" />
      <h2 className="text-2xl font-semibold">No titles found</h2>
      <p className="text-md mt-2 text-center px-4 max-w-sm">
        You haven’t created any title cards yet. Start by entering a title in
        the input above and click “Create” to get started!
      </p>
    </div>
  );
};

export default TitleNothing;
