import React from 'react';

import Calendar from '../Calendar/Calendar'

const WorkoutDays = (props) => {
    //show the calendar that is created by the trainer matched by email
    return (
        <>
            <div>
                <Calendar items={props}/>
                {/* {props.items.map((workout, index) => (
                <h5 key={index}>
                <Link to={`/dailyworkout/${workout.id}`}>{workout.date}</Link>
                
                
                </h5>
            ))} */}
            
            </div>
        </>
    )
}

export default WorkoutDays