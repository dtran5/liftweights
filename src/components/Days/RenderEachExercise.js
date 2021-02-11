import React from 'react';

import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card, ListGroup, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const RenderEachExercise = ( { exercise: {name, sets, reps, weight, id} }) => {

    const { currentUser: { uid } } = useAuth()
    const date = useParams().date
    
    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1)
        
    }

    const capitalName = capitalizeFirstLetter(name)

    // function getExerciseDetails() {
    //     db.collection('users')
    //       .doc(uid)
    //       .collection("dates")
    //       .doc(date)
    //       .collection('exercise-details')
    //       .onSnapshot(handleSnapshot)
    // }

    function handleDelete() {
        const exerciseRef = 
          db.collection("users")
            .doc(uid)
            .collection("dates")
            .doc(date)
            .collection("exercise-details")
            .doc(id)
            
        
            exerciseRef
            .delete()
            .then(()=>{
                console.log('deleted');
            }).catch(error => {
                console.error("Error deleting", error)
            })
        
    }
    
    return (
        <Container>
            <Card>
                <Card.Header>{capitalName}</Card.Header>
                <Button onClick={handleDelete} type="button">Delete</Button>
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