import "./SignUp.css"
import {Form, Button, Card, Alert} from 'react-bootstrap'
import React, {useRef, useEffect, useState} from "react";
import {useAuth} from '../context/AuthContext'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {collection, setDoc, doc} from "firebase/firestore";
import { db} from "../../firebase";

const SignUp = () =>{
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup, currentUser, logout} = useAuth()
    const history = useHistory()
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const userCollectionRef = collection(db, "users");
    let accountCreated = false;

    useEffect(() =>{
        if (currentUser !== null){
            logout();
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            setErrorMsg("Passwords do not match");
        }
        try{ 
            setErrorMsg('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            accountCreated = true;
            history.push("/home");

        } catch {
            setErrorMsg("Failed to create account");
        }
        setLoading(false);
    }

    return(
            <div className="signUpContainer">
            <Card bg="dark">
                <Card.Body>
                <h2 className="text-center mb-4">LiveLift</h2>
                <h5 className="text-center">Sign Up</h5>
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                </Form>
                </Card.Body>
                <p>
                Already have an account? <Link to="/login">Log in.</Link>
            </p>
            </Card>
            </div>
    );
}

export default SignUp;
