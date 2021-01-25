import React from 'react';
import { Link } from 'react-router-dom';

let workoutData = [
    {
        date: 'Jan 21, 2021',
        id: '01212021',
        exercises: [
            {
                name: 'Bench Press',
                sets: 3,
                reps: 10,
                weight: 135

            },
            {
                name: 'Back Squat',
                sets: 3,
                reps: 10,
                weight: 315

            },
            {
                name: 'Deadlift',
                sets: 3,
                reps: 10,
                weight: 225

            }
        ]
    },
    {
        date: 'Jan 22, 2021',
        id: '01222021',
        exercises: [
            {
                name: 'Overhead Press',
                sets: 3,
                reps: 10,
                weight: 95

            },
            {
                name: 'Reverse Lunges',
                sets: 3,
                reps: 10,
                weight: 225

            },
            {
                name: 'Skullcrushers',
                sets: 3,
                reps: 10,
                weight: 65

            }
        ]
    }
]

const WorkoutDays = () => {
    return (
        <div>
            {workoutData.map((workout, index) => (
            <h5 key={index}>
            <Link to={`/dailyworkout/${workout.id}`}>{workout.date}</Link>
            
            </h5>
        ))}
        </div>
    )
}

export default WorkoutDays