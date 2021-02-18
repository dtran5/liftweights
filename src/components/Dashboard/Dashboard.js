import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase';

function Dashboard() {
    const [error, setError] = useState("")
    const [userType, setUserType] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    let docRef = db.collection('users').doc(currentUser.uid)
    
    docRef.get().then((doc) => {
        if (doc.exists) {
            setUserType(doc.data().userType)
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to logo out')
        }
    }

    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong>User Type: </strong> 
                            {userType === "Trainer" ? 'Trainer' : 'Client'}
                            <br />
                            <strong>Email:</strong> {currentUser.email}
                            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                        </Card.Body>
                    </Card>
                        <div className="w-100 text-center mt-2">
                            <Button variant="link" onClick={handleLogout}>
                                Log Out
                            </Button>
                        </div>
                </div>
            </Container>
            
        </>
    )
}

export default Dashboard
