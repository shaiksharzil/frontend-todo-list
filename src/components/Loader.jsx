import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-120 w-full">
      <div
        className="text-3xl font-semibold bg-gradient-to-b from-[#304352] to-[#d7d2cc] bg-clip-text text-transparent"
        style={{
          animation: "fadeOut 1s linear infinite alternate",
        }}
      >
        Loading...
      </div>

      {/* Scoped keyframes */}
      <style>{`
          @keyframes fadeOut {
            to {
              opacity: 0;
            }
          }
        `}</style>
    </div>
  );
};

export default Loader;
  
  
  