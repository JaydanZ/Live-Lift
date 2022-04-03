import React, { useState } from "react";
import "./CreateProgram.css";
import Form from "react-bootstrap/Form";

const CreateProgram = (props) => {
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

  const submitHandler = (event) => {
    event.preventDefault();

    let cycleFormat;

    // Check fields
    if (programName.length === 0 || daysInput.length === 0) {
      return;
    }

    if (isCycle === "on") {
      cycleFormat = "Yes";
    } else {
      cycleFormat = "No";
    }

    const programData = {
      name: programName,
      cycle: cycleFormat,
      length: daysInput,
    };

    props.onProgramSubmit(programData);
  };

  return (
    <React.Fragment>
      <div className="createProgramCard">
        <div className="createProgramHeader">Your Program</div>
        <form onSubmit={submitHandler}>
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
            <button type="submit">
              <span className="buttonInner">Add Program</span>
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateProgram;
