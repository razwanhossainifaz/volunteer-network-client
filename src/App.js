import React, {createContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import VolenteerRegistration from './Components/VolenteerRegistration/VolenteerRegistration';
import EventTasks from './Components/EventTasks/EventTasks';
import Admin from './Components/Admin/Admin';
import CreateEvent from './Components/CreateEvent/CreateEvent';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import NoMatch from './Components/NoMatch/NoMatch';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          
          <Route exact path="/home">
            <Home />
          </Route>
          
          <PrivateRoute exact path="/vregistration/:id">
            <VolenteerRegistration />
          </PrivateRoute>
          
          <PrivateRoute exact exact path="/event">
            <EventTasks />
          </PrivateRoute>

          <Route exact path="/login">
            <Login />
          </Route>

          <PrivateRoute exact path="/admin">
            <Admin />
          </PrivateRoute>

          <PrivateRoute exact path="/create-event">
            <CreateEvent />
          </PrivateRoute>

          <PrivateRoute exact path="/events">
            <Redirect to="/create-event" />
          </PrivateRoute>

          <Route exact path="*">
            <NoMatch />
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
