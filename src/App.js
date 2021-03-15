import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainNavigation from "./components/Navigation/MainNavigation";
import Login from "./components/Forms/Login";
import RenderCalendar from "./components/Calendar/RenderCalendar";
import RecordWorkout from "./components/Forms/RecordWorkout";
import Dashboard from "./components/Dashboard/Dashboard";
import Signup from "./components/Forms/Signup";
import PrivateRoute from "./components/Routes/PrivateRoutes";
import ForgotPassword from "./components/Forms/ForgotPassword";
import UpdateProfile from "./components/Profile/UpdateProfile";
import ClientList from "./trainers/GetClientList";
import GetClientWorkout from "./clients/GetClientWorkout";

const App = () => {
  //go to home page
  //Login component checks if logged in - if you are goes to workouts
  //else loads up login form
  return (
    <Router>
      <AuthProvider>
        <MainNavigation />
        <main className="color">
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/clients" component={ClientList} />
            <Route exact path="/client/:email" component={RenderCalendar} />
            <Route path="/client/:email/:date" component={RecordWorkout} />
            <PrivateRoute
              path="/training/:email/:date"
              component={GetClientWorkout}
            />
            <PrivateRoute path="/:email" component={RenderCalendar} />
            <Route path="/forgotpassword" component={ForgotPassword} />
          </Switch>
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
