import React from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap'

const DUMMY_LOGIN = [
    {
        name: 'Chloe',
        password: 'Chubby'
    }
]

const LoginPage = (props) => {
    //Programmatically redirects to list of workouts if logged in
    if (DUMMY_LOGIN) {
        props.history.push('/dailyworkouts')
    }

    return (
        <Row className="justify-content-center mt-5" md={2}>
            <Col>
                <Container>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                </Container>
            </Col>
        </Row>
        
        
    )
}

export default LoginPage