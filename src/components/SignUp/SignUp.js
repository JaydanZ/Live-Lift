import "./SignUp.css"
import {Form, Button, Card, Alert} from 'react-bootstrap'
import React, {useRef, useEffect, useState} from "react";
import {useAuth} from '../context/AuthContext'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SignUp = () =>{
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const history = useHistory()
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            setErrorMsg("Passwords do not match");
        }
        try{ 
            setErrorMsg('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/home");
        } catch {
            setErrorMsg("Failed to create account");
        }
        setLoading(false);
    }

    return(
        <React.Fragment>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
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
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log in.</Link>
            </div>
        </ React.Fragment>
    );
}

export default SignUp;
