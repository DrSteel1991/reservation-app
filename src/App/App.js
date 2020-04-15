import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components';
import { LoginPage, HomePage, RegisterPage, ReservationPage } from '../pages';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute path="/register" component={RegisterPage} />
                    <PrivateRoute path="/reservations" component={ReservationPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        );
    }
}

export { App };