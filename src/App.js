import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';


import MainNavigation from './components/Navigation/MainNavigation'
import Login from './components/Forms/Login'
import WorkoutDays from './components/Days/WorkoutDays';
import RecordWorkout from './components/Forms/RecordWorkout';
import Dashboard from './components/Dashboard/Dashboard'
import Signup from './components/Forms/Signup';
import PrivateRoute from './components/Routes/PrivateRoutes';
import ForgotPassword from './components/Forms/ForgotPassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import ClientList from './components/Forms/ClientList';
import ClientWorkout from './components/Days/ClientWorkout';



const App = () => {
  
    //go to home page
    //Login component checks if logged in - if you are goes to workouts
    //else loads up login form
    return (
      
      <Router>
        <AuthProvider>
          
            <MainNavigation />
            <main>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route exact path='/signup' component={Signup} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/clients" component={ClientList} />
                <Route exact path="/client/:email" component={WorkoutDays} />
                <Route path="/client/:email/:date" component={RecordWorkout} />
                <PrivateRoute path="/training/:email/:date" component={ClientWorkout} />
                <PrivateRoute path="/:email" component={WorkoutDays} />
                <Route path="/forgotpassword" component={ForgotPassword} />
                
                

              </Switch>
            </main>
          
        </AuthProvider>
      </Router>
       
    )
}

export default App