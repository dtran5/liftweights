import React from 'react';

import { Container, Card, ListGroup } from 'react-bootstrap'

const RenderEachExercise = ({ exercise: {name, sets, reps, weight} }) => {
    
    return (
        <Container>
            <Card>
                <Card.Header>{name}</Card.Header>
                <ListGroup variant="flush">
                <ListGroup.Item>Sets: {sets}</ListGroup.Item>
                <ListGroup.Item>Reps: {reps}</ListGroup.Item>
                <ListGroup.Item>Weight: {weight}</ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
        
    )
}

export default RenderEachExercise