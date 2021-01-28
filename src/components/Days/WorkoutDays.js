import React from 'react';
import { Link } from 'react-router-dom';

import Calendar from '../Calendar/Calendar'

const WorkoutDays = (props) => {
    
  

    return (
        <div>
            <Calendar />
            {props.items.map((workout, index) => (
            <h5 key={index}>
            <Link to={`/dailyworkout/${workout.id}`}>{workout.date}</Link>
            
            
            </h5>
        ))}
        
        </div>
    )
}

export default WorkoutDays