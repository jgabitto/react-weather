import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './components/App';
import FirebaseContext, { withFirebase } from './contexts/FirebaseContext';
import Firebase from './Firebase/firebaseConfig';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>, 
    document.getElementById('root')
);