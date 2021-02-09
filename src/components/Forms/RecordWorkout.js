import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext'



const RecordWorkout = () => {
    const [loading, setLoading] = useState(false)
    //grab the date from URL and use it as document name in database
    const date = useParams().date;
    //grab unique id created from database authentication
    const { uid } = useAuth()
    const nameRef = useRef();
    const setsRef = useRef()
    const repsRef = useRef()
    const weightRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(date);

        db.collection("users")
          .doc(uid).collection("dates")
          .doc(date).collection("exercises")
          .doc().collection("exercise-details")
          .add({
            name: nameRef.current.value,
            sets: setsRef.current.value,
            reps: repsRef.current.value,
            weight: weightRef.current.value
        }).then(()=>{
            console.log('worked');
            console.log(uid);
            
        }).catch(()=>{
            console.log('did not work');
        })
    }


    return (
        <>  
            <Link to={'/record'}>Back</Link>
            <Form onSubmit={handleSubmit} className="container mt-5">
                <Form.Group controlId="exercise">
                    <Form.Label>Exercise</Form.Label>
                    <Form.Control ref={nameRef} type="text" placeholder="Exercise Name" />
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="sets">
                    <Form.Label>Sets</Form.Label>
                    <Form.Control ref={setsRef} type="text" placeholder="How many sets did you do?" />
                </Form.Group>
                <Form.Group controlId="reps">
                    <Form.Label>Reps</Form.Label>
                    <Form.Control ref={repsRef} type="text" placeholder="How many reps per set?" />
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="weight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control ref={weightRef} type="text" placeholder="How much gravity did you fight?" />
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default RecordWorkout