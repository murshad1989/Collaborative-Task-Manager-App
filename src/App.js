// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Register from './Component/Register';
import Login from './Component/Login';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';
import Logout from './Component/Logout';
import TaskList from './Component/TaskList'; 
const App = () => {
    return (
        <Router>
            <Navbar /> { /* Include Navbar */}
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password/:token" component={ResetPassword} />
                <Route path="/logout" component={Logout} />
                <Route path="/tasks" component={TaskList} />
            </Switch>
        </Router>
    );
};

export default App;