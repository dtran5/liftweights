import React, { useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
//this is our way to use our context that we created in AuthContext
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase'



function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, uid } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    //this is an async function - had to check passwords and get back to us
    async function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            //we return here because we want to immediately exit the function and not keep going
            //if there is an error
            return setError('Passwords do not match')
        }

        //if its successful it will - set error to empty and set a loading state which will
        //disable the submit button so users dont keep clicking and signing up
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create an account')
        }
        //after everything is done, setloading back to false - this is done after it is done
        //awaiting the signup function
        setLoading(false)
    } 

    //user is added to user collection with their own uid as a document
    // function addUserToDatabase(uid) {
    //     db.collection("users").doc(uid).set({
    //         email: emailRef.current.value

    //     })
    // }


    //if we are currently loading, dont want to be able to resubmit form!
    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >   
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </div>
                
            </Container>
            
            
        </>
    )
}

export default Signup
