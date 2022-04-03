import React, { useState, useEffect } from "react";
import CreateProgram from "../CreateProgram/CreateProgram";
import EditProgram from "../EditProgram/EditProgram";
import ProgramItem from "./ProgramItem";
import "./Home.css";
import axios from "axios";
import { db } from "../../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, doc, getDocs, updateDoc, setDoc } from "firebase/firestore";
import {useHistory} from "react-router-dom"

let userData = [];
const Home = () => {
  const [createProgram, setCreateProgram] = useState(false);
  const [programArr, setProgramArr] = useState([]);
  const { currentUser, newAccount, accountComplete } = useAuth();
  const userCollectionRef = collection(db, "users");
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const createProgramHandler = () => {
    setCreateProgram(true);
  };

  useEffect(() => {
    getUserData();
    completeSignup();
    if (currentUser === null){
        history.push("/signup");
    }
  }, []);

  const completeSignup = async () =>{
    if (newAccount === true){
        await setDoc(doc(db, "users", currentUser.uid), {
            userId : currentUser.uid,
            userPrograms : [],
        })
        accountComplete();
    }

}

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
    setProgramArr(userData[0].userPrograms.map((data) => data));
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
                      name={progEntry.programName}
                      cycle={progEntry.isCycle}
                      length={progEntry.days.length}
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
