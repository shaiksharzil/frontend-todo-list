import React from "react";

const Foot = () => {
  return (
    <footer className="h-20 mt-5 w-full border-t-1 border-gray-500 text-center">
      <div className="h-1/2 flex justify-center items-center">
        <h4>
          Made by{" "}
          <a
            className="text-emerald-500"
            href="http://shaik-sharzil.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            shaik sharzil
          </a>
        </h4>
      </div>
      <div className="h-1/2 flex justify-center gap-3 items-center">
        <a
          href="https://github.com/shaiksharzil/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl"
        >
          <i className="ri-github-fill"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/shaik-sharzil?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl"
        >
          <i className="ri-linkedin-box-fill"></i>
        </a>
        <a
          href="https://www.instagram.com/shaik_sharzil?utm_source=qr&igsh=Nm5sd2Q2czJmMmo="
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl"
        >
          <i className="ri-instagram-fill"></i>
        </a>
      </div>
    </footer>
  );
};

export default Foot;
