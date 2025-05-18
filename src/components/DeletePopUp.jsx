import React from 'react'

const DeletePopUp = ({t, handleDelete, setDelPopUp}) => {
    return (
      <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-[#00000070] z-50">
        <div className="fixed  bg-white  w-90 rounded-md mx-4 flex flex-col">
          <div className="mx-3 my-4 px-2 rounded-sm">
            <h3 className="text-xl max-md:text-lg break-words">
              Are you sure you want to delete <strong>{t.task}</strong>?
            </h3>
          </div>
          <div className="flex justify-end mt-5 gap-4 mr-2 mb-4">
            <button
              onClick={() => setDelPopUp(false)}
              className="bg-emerald-500 text-white rounded-md px-3 py-0.5 text-lg hover:bg-emerald-400 active:scale-90 cursor-pointer"
            >
              No
            </button>
            <button
              onClick={() => handleDelete(t._id)}
              className="bg-red-500 rounded-md text-white px-3 py-0.5 text-lg hover:bg-red-400 active:scale-90 cursor-pointer"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
}

export default DeletePopUp