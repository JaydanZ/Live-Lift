import React, { useState } from "react";
import "./CreateProgram.css";
import Form from "react-bootstrap/Form";

const CreateProgram = () => {
  const [programName, setProgramName] = useState("");
  const [isCycle, setIsCycle] = useState(false);
  const [daysInput, setDaysInput] = useState("");

  const nameChangeHandler = (event) => {
    setProgramName(event.target.value);
  };

  const cycleChangeHandler = (event) => {
    setIsCycle(event.target.value);
  };

  const daysChangeHandler = (event) => {
    setDaysInput(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="createProgramCard">
        <div className="createProgramHeader">Your Program</div>
        <form>
          <div className="formContentWrapper">
            <div className="programFormNameField">
              Program Name
              <input
                className="programTextField"
                type="text"
                placeholder="Program Name"
                onChange={nameChangeHandler}
              />
              <span className="focus-border"></span>
            </div>
            <div className="programFormCycleField">
              Is it a Cycle?
              <input
                type="checkbox"
                id="custom-switch"
                onChange={cycleChangeHandler}
              />
            </div>
            <div className="programFormDaysField">
              How many days?
              <input
                className="programTextField"
                type="number"
                min="1"
                step="1"
                onChange={daysChangeHandler}
                placeholder="Ex: 1"
              />
            </div>
            <button type="button">Add Program</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateProgram;
