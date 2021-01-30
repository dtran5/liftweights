import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap'
//this is our way to use our context that we created in AuthContext
import { useAuth } from '../../contexts/AuthContext'



function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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
        } catch {
            setError('Failed to create an account')
        }
        //after everything is done, setloading back to false - this is done after it is done
        //awaiting the signup function
        setLoading(false)
    } 

    //if we are currently loading, dont want to be able to resubmit form!
    return (
        <>
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
                Already have an account? Log In
            </div>
        </>
    )
}

export default Signup
