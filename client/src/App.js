import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Profile from './components/Profile';
import Register from './components/auth/Register';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Styles
import './App.css';

axios.defaults.baseURL = 'http://localhost:5000/api';

const App = () => (
    <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing}/>
                <section className="container">
                    <Alert />
                    <Switch>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profile" component={Profile}/>
                    </Switch>
                </section>
            </Fragment>
        </Router>
    </Provider>
);

export default App;
