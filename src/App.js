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
import Test from './components/Test';


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
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route exact path='/signup' component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/test" component={Test} />
              <Route path="/dailyworkout/:date" component={RecordWorkout} />
              <PrivateRoute path='/workouts' component={WorkoutDays} />

            </Switch>
          </main>
        </AuthProvider>
      </Router>
       
    )
}

export default App