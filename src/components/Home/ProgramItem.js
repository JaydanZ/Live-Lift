import React from "react";
import "./ProgramItem.css";

const ProgramItem = (props) => {
  return (
    <div className="programItem">
      <div className="programItemHeader">{props.name}</div>
      <div className="programItemBody">
        Cycle: {props.cycle} | Length: {props.length} Days
      </div>
    </div>
  );
};

export default ProgramItem;
