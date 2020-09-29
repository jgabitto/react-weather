import React from 'react';
 
import { withFirebase } from '../contexts/FirebaseContext';
 
const SignOutButton = ({ firebase }) => (
  <a className="nav-link btn" onClick={firebase.doSignOut}>
    Sign Out
  </a>
);
 
export default withFirebase(SignOutButton);