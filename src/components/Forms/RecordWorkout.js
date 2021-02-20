import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext'
import RenderEachExercise from '../Days/RenderEachExercise';



const RecordWorkout = () => {
    const [loading, setLoading] = useState(false)
    const [exerciseList, setExerciseList] = useState([])
    //grab the date from URL and use it as document name in database
    const date = useParams().date;
    //grab unique id created from database authentication
    const { currentUser: { uid, email } }  = useAuth()
    const nameRef = useRef();
    const setsRef = useRef()
    const repsRef = useRef()
    const weightRef = useRef()

   

    async function handleSubmit (e) {
        e.preventDefault()
        setLoading(true)
        
        //MAKE THIS EMAIL OF THE CLIENT
        //Sets trainer's currently worked on client's email to each date so it can be verified later
        await 
        db.collection("users")
            .doc(uid)
            .collection("dates")
            .doc(date)
            .set({
                email: email
        })

        await 
        db.collection("users")
          .doc(uid)
          .collection("dates")
          .doc(date)
          .collection("exercise-details")
          .doc()
          .set({
            name: nameRef.current.value,
            sets: setsRef.current.value,
            reps: repsRef.current.value,
            weight: weightRef.current.value
        }).then(()=>{
            console.log('worked');
            
        }).catch(()=>{
            console.log('did not work');
        })
    }

    useEffect(() => {
        function getExerciseDetails() {
            db.collection('users')
              .doc(uid)
              .collection("dates")
              .doc(date)
              .collection('exercise-details')
              .onSnapshot(handleSnapshot)
        }

        getExerciseDetails()
    }, [date, uid])

    //onSnapshot is an active listener that listens for changes to the collection so when user adds new exercise, it is immediately fetched and displayed
    //onSnapshot returns a callback for us to work on given documents
    

    //within the callback that onSnapshot provides, we are passed a snapshot of our data. It contains the documents in the collection. map through our docs array to return our data
    //exercise.id grabs the id of the document of the individual exercise and then exercise.data() opens the document and retrieves its contents
    function handleSnapshot(snapshot) {
        const exerciseList = snapshot.docs.map((exercise) => {
            return { id: exercise.id, ...exercise.data() }
        })
        setExerciseList(exerciseList)
       
        
    }
    
    return (
        <>
            <div>
                {exerciseList.map((exercise) => (
                   <RenderEachExercise key={exercise.id} exercise={exercise} /> 
                ))}
            </div>  
            <Link to={'/workouts'}>Back</Link>
            {}
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