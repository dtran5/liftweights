import React from 'react';

import { Container, Card, ListGroup } from 'react-bootstrap'

const RenderEachExercise = (props) => {
    
    return (
        <Container>
            <Card>
                <Card.Header>{props.name}</Card.Header>
                <ListGroup variant="flush">
                <ListGroup.Item>Sets: {props.sets}</ListGroup.Item>
                <ListGroup.Item>Reps: {props.reps}</ListGroup.Item>
                <ListGroup.Item>Weight: {props.weight}</ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
        
    )
}

export default RenderEachExercise