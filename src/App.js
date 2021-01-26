import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainNavigation from './components/Navigation/MainNavigation'
import LoginPage from './components/Login'
import WorkoutDays from './components/Days/WorkoutDays';
import WorkoutDay from './components/Days/WorkoutDay'


import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
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
    },
    {
      date: 'Jan 23, 2021',
      id: '01232021',
      exercises: [
          {
              name: 'Barbell Row',
              sets: 1,
              reps: 12,
              weight: 135

          },
          {
              name: 'Pullups',
              sets: 5,
              reps: 5,
              weight: 315

          },
          {
              name: 'Bicep Curls',
              sets: 3,
              reps: 20,
              weight: 225

          }
      ] 
    },
  {
    date: 'Jan 24, 2021',
    id: '01242021',
    exercises: [
        {
            name: 'Sumo Deadlift',
            sets: 3,
            reps: 12,
            weight: 135

        },
        {
            name: 'Leg Curls',
            sets: 2,
            reps: 15,
            weight: 315

        },
        {
            name: 'Calf Raises',
            sets: 5,
            reps: 20,
            weight: 225

        }
    ]
  }
]
  
    return (
      
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/dailyworkouts">
              <WorkoutDays items={workoutData}/> 
            </Route>

            <Route path="/dailyworkout/:date">
              <WorkoutDay items={workoutData} />
            </Route>
            <Route exact path='/' component={LoginPage} />
          </Switch>
        </main>
      </Router>
       
    )
}

export default App