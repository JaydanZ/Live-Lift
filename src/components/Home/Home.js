import React, { useState, useEffect } from "react";
import CreateProgram from "../CreateProgram/CreateProgram.js";
import EditProgram from "../EditProgram/EditProgram.js";
import "./Home.css";
import axios from "axios"
import {db} from "../../firebase"
import {useAuth} from '../context/AuthContext'
import {collection, doc, getDocs} from "firebase/firestore";


let userData = [];
const Home = () => {
  const [createProgram, setCreateProgram] = useState(false);
  const [programArr, setProgramArr] = useState([]);
  const {currentUser} = useAuth();
    const userCollectionRef = collection(db, "users");

  const createProgramHandler = () => {
    setCreateProgram(true);
  };

  useEffect(() => {
    getUserData();
  },[]);

  const getUserData = async () =>{
    const data = await getDocs(userCollectionRef);
    userData = data.docs.map((doc) => ({
        ...doc.data()}));
    userData = userData.filter((data) => {
        if (data.userId === currentUser.uid){
            return data;
        }
    })
    console.log(userData);
  }

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
