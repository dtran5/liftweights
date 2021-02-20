import React, { useEffect, useRef, useState } from 'react'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import RenderEachClient from '../Days/RenderEachClient'

function ClientList() {
    const [loading, setLoading] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const { currentUser: { uid } } = useAuth()
    const [clientList, setClientList] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        await 
            db
            .collection('trainers')
            .doc(uid)
            .collection('trainer-clients')
            .doc(emailRef.current.value)
            .set({
                name: nameRef.current.value,
                email: emailRef.current.value
            }).then(() => {
                console.log('Added new client');
            }).catch(() => {
                console.log('Client failed to add')
            })

    }

    useEffect(() => {
        function getClients() {
            db
            .collection('trainers')
            .doc(uid)
            .collection('trainer-clients')
            .onSnapshot(handleSnapshot)
        }

        getClients()
    }, [clientList, uid])

    

    function handleSnapshot(snapshot) {
        const clientList = snapshot.docs.map((client) => {
            return { id: client.id, ...client.data() }
        })

        setClientList(clientList)
    }


    return (
        <>
            <div>
                
            </div>
            <Container
                className="d-flex justify-content-center align-items-center mt-3"
                style={{ minHeight: "75vh" }}
            >
                <Row className="text-center">
                <Col className="d-flex flex-column align-items-center" xs={12} sm={6}>
                        <h3>New client?</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={nameRef} required />
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button type="submit">Add to list</Button>
                        </Form>
                    </Col>
                    <Col className="d-flex flex-column align-items-center mt-3" xs={12} sm={6}>
                        {clientList.map((client) => (
                            <RenderEachClient key={client.id} client={client} />
                        ))}
                        <Button className="w-50 mt-5">View Workouts</Button>
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}

export default ClientList
