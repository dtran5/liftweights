import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import MainNavigation from './components/Navigation/MainNavigation'
import Login from './components/Forms/Login'
import WorkoutDays from './components/Days/WorkoutDays';
import WorkoutDay from './components/Days/WorkoutDay'
import RecordWorkout from './components/Forms/RecordWorkout';
import Signup from './components/Forms/Signup';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {

  let workoutData = [
    
    {
        date: 'Jan 28, 2021',
        id: '01-28-2021',
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
        date: 'Jan 29, 2021',
        id: '01-29-2021',
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
      date: 'Jan 30, 2021',
      id: '01-30-2021',
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
    date: 'Jan 31, 2021',
    id: '01-31-2021',
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
    //go to home page
    //Login component checks if logged in - if you are goes to workouts
    //else loads up login form
    return (
      
      <Router>
        <AuthProvider>
          <MainNavigation />
          <main>
            <Switch>
              <Route path="/dailyworkouts">
                <WorkoutDays items={workoutData}/> 
              </Route>

              <Route path="/dailyworkout/:date">
                <WorkoutDay items={workoutData} />
              </Route>
              <Route exact path='/'>
                <Container 
                  className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: "100vh" }}
                >
                  <div 
                    className="w-100"
                    style={{ maxWidth: '400px' }}
                  >
                    <Signup />
                  </div>
                </Container>
                
              </Route>
              <Route path='/record'>
                <RecordWorkout />
              </Route>
              
            </Switch>
          </main>
        </AuthProvider>
        
      </Router>
       
    )
}

export default App