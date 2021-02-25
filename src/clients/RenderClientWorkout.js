import React from 'react';

const RenderClientWorkout = ( { exercise : { name, sets, reps, weight } }) => {

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

export default RenderClientWorkout