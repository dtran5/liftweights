import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { Container, Table } from 'react-bootstrap'
import RenderClientExercise from '../Days/RenderClientExercise'
import RenderEachExercise from './RenderEachExercise';

function ClientWorkout() {
    const emailOfClient = useParams().email
    const date = useParams().date
    const [exerciseList, setExerciseList] = useState([])
    const [clientTrainer, setClientTrainer] = useState('')
    const { currentUser: { uid }, clientTrainerEmailState } = useAuth()

    useEffect(() => {
        console.log(clientTrainerEmailState);
        console.log(emailOfClient);

        async function getClientWorkouts() {
            await db.collection("trainers")
                .doc(clientTrainerEmailState)
                .collection('trainer-clients')
                .doc(emailOfClient)
                .collection("dates")
                .doc(date)
                .collection('exercise-details')
                .onSnapshot(handleSnapshot)
        }
    
        getClientWorkouts()
    }, [date, emailOfClient, clientTrainerEmailState])

    
//     //Grab the client trainers email off of the document stored on the user info
//     async function getClientTrainer() {
//         const clientTrainerRef = await db.collection('users').doc(uid).get()
//         const clientTrainer = await clientTrainerRef.data().clientTrainer
        
//         return clientTrainer
//     }

//     //Put the grabbed trainer information into state
//     getClientTrainer().then((trainer) => {
//         setClientTrainer(trainer)
//     })

    

    // useEffect(() => {
    //     // Get the client workouts
    // // async function getClientWorkout() {
    // //     if (clientTrainerEmailState) {
    // //         await 
    // //         db.collection("trainers")
    // //         .doc(clientTrainerEmailState)
    // //         .collection('trainer-clients')
    // //         .doc(emailOfClient)
    // //         .collection("dates")
    // //         .doc(date)
    // //         .collection('exercise-details')
    // //         .get()
    // //         .then((querySnapshot) => {
    // //             querySnapshot.forEach((doc) => {
    // //                 setExerciseList(doc.data())
                    
    // //             })
    // //         })
    // //     }
    // // }

    
    // }, [])
    
   function handleSnapshot(snapshot) {
       const exerciseList = snapshot.docs.map((exercise) => {
           return { id: exercise.id, ...exercise.data() }
       })

       setExerciseList(exerciseList)
   }

    return (
        <>
           <Container className="d-flex justify-content-center align-items-center">
                    <Table striped bordered hover className="w-75">
                        <thead>
                            <tr>
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Suggested Starting Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exerciseList.map((exercise) => (
                            <RenderClientExercise key={exercise.id} exercise={exercise} /> 
                            ))}
                        </tbody>
                    </Table>
                </Container>
        </>
    )
}

export default ClientWorkout
