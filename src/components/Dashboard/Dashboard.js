import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'

function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout, trainerTypeState } = useAuth()
    const history = useHistory()
    
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
                className="dashboard d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="dashboard__h2 text-center mb-4 custom-class">Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong>User: </strong> {trainerTypeState ? 'Trainer' : 'Client'}
                            <br />
                            <strong>Name:</strong> {currentUser.displayName}
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
