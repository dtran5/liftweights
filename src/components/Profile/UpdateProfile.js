import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
//this is our way to use our context that we created in AuthContext
import { useAuth } from '../../contexts/AuthContext'



function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    //this is an async function - had to check passwords and get back to us
    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            //we return here because we want to immediately exit the function and not keep going
            //if there is an error
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")
        //if updated email doesnt equal current email, then call updateemail function and pass it the new updated email
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        //As soon as all of our above promises finish, we run a .then if they are all successful
        //takes in our array of promises
        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })

        //if its successful it will - set error to empty and set a loading state which will
        //disable the submit button so users dont keep clicking and signing up
    
    } 

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
                            <h2 className="text-center mb-4">Update Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        ref={emailRef} 
                                        required defaultValue={currentUser.email} 
                                    />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        ref={passwordRef} 
                                        placeholder="Leave blank to keep the same" 
                                    />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        ref={passwordConfirmRef} 
                                        placeholder="Leave blank to keep the same"
                                    />
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Link to="/">Cancel</Link>
                    </div>
                </div>
                
            </Container>
            
            
        </>
    )
}

export default UpdateProfile
