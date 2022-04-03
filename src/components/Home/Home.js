import React, { useState } from "react";
import CreateProgram from "../CreateProgram/CreateProgram";
import EditProgram from "../EditProgram/EditProgram";
import ProgramItem from "./ProgramItem";
import "./Home.css";

const Home = () => {
  const [createProgram, setCreateProgram] = useState(false);
  const [programArr, setProgramArr] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const createProgramHandler = () => {
    setCreateProgram(true);
  };

  const programSubmitHandler = (programObj) => {
    let programArrayCopy = programArr.map((progEntry) => {
      return progEntry;
    });

    programArrayCopy.push(programObj);
    setProgramArr(programArrayCopy);
    setCreateProgram(false);
  };

  const handlerEditModal = () => {
    setShowModal(true);
  };

  return (
    <React.Fragment>
      <div className="homeCardContainer">
        {!createProgram ? (
          <div className="homeCard">
            <div className="homeCardHeader">Home</div>
            <div className="programHeader">Your Programs</div>
            {programArr.length > 0 && (
              <div className="programListContainer">
                <ul className="programList">
                  {programArr.map((progEntry) => (
                    <ProgramItem
                      name={progEntry.name}
                      cycle={progEntry.cycle}
                      length={progEntry.length}
                      onEditProgram={handlerEditModal}
                    />
                  ))}
                </ul>
              </div>
            )}
            <div className="createProgramPrompt">
              Create a program
              <div className="createProgramBtn">
                <ion-icon
                  name="add-circle"
                  onClick={createProgramHandler}
                ></ion-icon>
              </div>
            </div>
          </div>
        ) : (
          <CreateProgram onProgramSubmit={programSubmitHandler} />
        )}
      </div>
      <EditProgram show={showModal} onHide={() => setShowModal(false)} />
    </React.Fragment>
  );
};

export default Home;
