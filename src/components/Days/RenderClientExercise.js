import React from 'react';

import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const RenderClientExercise = ( { exercise : { name, sets, reps, weight } }) => {
    const emailOfClient = useParams().email
    const { currentUser: { uid } } = useAuth()
    const date = useParams().date
    
    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1)
        
    }

    const capitalName = capitalizeFirstLetter(name)

    
    
    return (
        <tr>
            <td>{capitalName}</td>
            <td>{sets}</td>
            <td>{reps}</td>
            <td>{weight}</td>
        </tr>
        
    )
}

export default RenderClientExercise