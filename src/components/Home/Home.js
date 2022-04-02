import React, { useState } from "react";
import CreateProgram from "../CreateProgram/CreateProgram.js";
import EditProgram from "../EditProgram/EditProgram.js";
import "./Home.css";

const Home = () => {
  const [createProgram, setCreateProgram] = useState(false);
  const [programArr, setProgramArr] = useState([]);

  const createProgramHandler = () => {
    setCreateProgram(true);
  };

  return (
    <React.Fragment>
      <div className="homeCardContainer">
        {!createProgram ? (
          <div className="homeCard">
            <div className="homeCardHeader">Home</div>
            <div className="programHeader">Your Programs</div>
            {!programArr.length === 0 ? (
              <div className="ProgramModalPlaceholder"></div>
            ) : (
              <div className="createProgramPrompt">
                Create a program
                <div className="createProgramBtn">
                  <ion-icon
                    name="add-circle"
                    onClick={createProgramHandler}
                  ></ion-icon>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CreateProgram />
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
