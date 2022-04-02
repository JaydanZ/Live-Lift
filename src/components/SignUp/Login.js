import "./Login.css"
import {Form, Button, Card, Alert} from 'react-bootstrap'
import React, {useRef, useEffect, useState} from "react";
import {useAuth} from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom";

const Login = () =>{
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{ 
            setErrorMsg('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            setErrorMsg("Failed to log in");
        }
        setLoading(false);
    }

    return(
        <React.Fragment>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
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
                    <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign up.</Link>
            </div>
        </ React.Fragment>
    );
}

export default Login;