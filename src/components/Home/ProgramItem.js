import React from "react";
import "./ProgramItem.css";

const ProgramItem = (props) => {
  const editBtnHandler = () => {
    props.onEditProgram();
  };
  return (
    <div className="programItem">
      <div className="programItemHeader">{props.name}</div>
      <div className="programItemBody">
        Length: {props.length} Days
      </div>
      <div className="programBtnContainer">
        <button
          className="programEditBtn"
          type="button"
          onClick={editBtnHandler}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProgramItem;
