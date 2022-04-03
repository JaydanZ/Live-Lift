import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./EditProgram.css";

const EditProgram = (props) => {
  const [exerciseArr, setExerciseArr] = useState([]);
  const [addExercise, setAddExercise] = useState(false);

  const addExerciseHandler = () => {
    setAddExercise(true);
  };

  const confirmAdd = () => {
    setAddExercise(false);
  };
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <div className="editProgramHeader">Edit Program</div>
      </Modal.Header>
      <Modal.Body>
        <div className="editProgramContainer">
          {addExercise ? (
            <div className="editProgramBody">
              <div className="addExerciseHeader">Add Exercise</div>
              <input type="text" placeholder="Exercise"></input>
              <button
                type="button"
                className="confirmAddBtn"
                onClick={confirmAdd}
              >
                Confirm Exercise
              </button>
            </div>
          ) : (
            <div className="addExerciseBtnContainer">
              <button
                type="button"
                className="addExerciseBtn"
                onClick={addExerciseHandler}
              >
                Add Exercise
              </button>
            </div>
          )}
          <div className="exerciseListContainer">
            <ul className="exerciseList">
              <li className="exerciseListItem">Exercise 1</li>
              <li className="exerciseListItem">Exercise 2</li>
              <li className="exerciseListItem">Exercise 3</li>
              <li className="exerciseListItem">Exercise 4</li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default EditProgram;
