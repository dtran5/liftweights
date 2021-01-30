import React from 'react';

import { Form, Button } from 'react-bootstrap';

const RecordWorkout = () => {
    return (
        <Form className="container mt-5">
            <Form.Group controlId="exercise">
                <Form.Label>Exercise</Form.Label>
                <Form.Control type="text" placeholder="Exercise Name" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="sets">
                <Form.Label>Sets</Form.Label>
                <Form.Control type="text" placeholder="How many sets did you do?" />
            </Form.Group>
            <Form.Group controlId="reps">
                <Form.Label>Reps</Form.Label>
                <Form.Control type="text" placeholder="How many reps per set?" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control type="text" placeholder="How much gravity did you fight?" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default RecordWorkout