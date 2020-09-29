import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Landing from './Landing';
import SignIn from './Signin';
import SignUp from './SignUp';
import Bookmarks from './Bookmarks';
import Account from './Account';
import withAuthentication from './Session/withAuthentication';
import NavbarComponent from './Navbar';
import history from '../history';
import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(10, 25, 47);
  }
`

const App = () => {
    return (
        <Router history={history}>
            <NavbarComponent />
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/home" exact component={Home} />
                <Route path="/account" exact component={Account} />
                <Route path="/bookmarks" exact component={Bookmarks} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
            </Switch>
        </Router>
    );
}

export default withAuthentication(App);