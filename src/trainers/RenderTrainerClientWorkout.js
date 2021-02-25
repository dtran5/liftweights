import React from 'react';

import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const RenderTrainerClientWorkout = ( { exercise: {name, sets, reps, weight, id} }) => {
    const emailOfClient = useParams().email
    const { currentUser: { uid } } = useAuth()
    const date = useParams().date
    
    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1)
        
    }

    const capitalName = capitalizeFirstLetter(name)

    function handleDelete() {
        const exerciseRef = 
          db.collection("trainers")
            .doc(uid)
            .collection("trainer-clients")
            .doc(emailOfClient)
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
        <tr>
            <td>{capitalName}</td>
            <td>{sets}</td>
            <td>{reps}</td>
            <td>{weight}</td>
            <td><Button onClick={handleDelete} type="button">Delete</Button></td>
        </tr>
        
    )
}

export default RenderTrainerClientWorkout