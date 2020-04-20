import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { history } from '../helpers';
import { PrivateRoute } from '../components';
import { LoginPage, HomePage, RegisterPage, ReservationPage } from '../pages';
import { alertActions } from '../actions';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch]);

    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <PrivateRoute path="/reservations" component={ReservationPage} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export { App };