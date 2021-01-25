import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainNavigation from './components/Navigation/MainNavigation'
import LoginPage from './components/Login'
import WorkoutDays from './components/Days/WorkoutDays';
import WorkoutDay from './components/Days/WorkoutDay'


import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

    return (
      
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/dailyworkouts" component={WorkoutDays} />
            <Route path="/dailyworkout/:date" component={WorkoutDay} />
 
            <Route exact path='/' component={LoginPage} />
          </Switch>
        </main>
      </Router>
       
    )
}

export default App