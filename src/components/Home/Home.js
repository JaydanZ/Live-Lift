import React, { useState, useEffect } from "react";
import CreateProgram from "../CreateProgram/CreateProgram";
import EditProgram from "../EditProgram/EditProgram";
import ProgramItem from "./ProgramItem";
import "./Home.css";
import axios from "axios";
import { db } from "../../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

let userData = [];
const Home = () => {
  const [createProgram, setCreateProgram] = useState(false);
  const [programArr, setProgramArr] = useState([]);
  const { currentUser } = useAuth();
  const userCollectionRef = collection(db, "users");

  const createProgramHandler = () => {
    setCreateProgram(true);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = await getDocs(userCollectionRef);
    userData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    userData = userData.filter((data) => {
      if (data.userId === currentUser.uid) {
        return data;
      }
    });
    setProgramArr(userData[0].userPrograms.programs.map((data) => data));
  };
  const programSubmitHandler = async (programObj) => {
    let programArrayCopy = programArr.map((progEntry) => {
      return progEntry;
    });
    programArrayCopy.push(programObj);
    console.log(programArrayCopy);
    const userDoc = doc(db, "users", currentUser.uid);
    const newFields = { userPrograms: programArrayCopy };
    await updateDoc(userDoc, newFields);
    setProgramArr(programArrayCopy);
    setCreateProgram(false);
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
                      name={progEntry.programName}
                      cycle={progEntry.isCycle}
                      length={progEntry.days.length}
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
    </React.Fragment>
  );
};

export default Home;
