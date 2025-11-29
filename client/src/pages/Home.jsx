import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NameHandler from "../components/NameHandler";

const Home = () => {

  const removeName = () => {
    localStorage.removeItem("userName");
  };

  const navigate = useNavigate();
  const goToCreate = async () => {
    navigate("/create");
  };

  return (
    <div className="   flex justify-center items-center min-h-[82vh] w-screen[99vw]">
      {/* Name Handler */}
      <NameHandler/>

      {/* Home Page */}

      <div className="   text-center w-screen">
        <h2>Welcome To My Chatting App</h2>
        <h2>Welcome {name}</h2>
        <button
          className="bg-blue-500 border rounded-sm my-3 px-2 py-3 font-bold"
          onClick={goToCreate}
        >
          Create Room
        </button>
        <button onClick={removeName} className="btn">
          clear
        </button>
      </div>
    </div>
  );
};

export default Home;
