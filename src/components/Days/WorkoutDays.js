import React from 'react';
import { Link } from 'react-router-dom';


const WorkoutDays = (props) => {
    console.log(props);
    return (
        <div>
            {props.items.map((workout, index) => (
            <h5 key={index}>
            <Link to={`/dailyworkout/${workout.id}`}>{workout.date}</Link>
            
            
            </h5>
        ))}
        
        </div>
    )
}

export default WorkoutDays