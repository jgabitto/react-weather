import React, { useState, useEffect, useContext } from 'react';

import FirebaseContext from '../../contexts/FirebaseContext';
import { withFirebase } from '../../contexts/FirebaseContext';
import AuthUserContext from '../../contexts/AuthUserContext';

const withAuthentication = Component => {
    const HOC = props => {
        const [authUser, setAuthUser] = useState(null);
        const firebase = useContext(FirebaseContext);

        useEffect(() => {
            firebase.auth.onAuthStateChanged(authUser => {
                authUser ? setAuthUser(authUser) : setAuthUser(null);
            })
        }, [firebase.auth])

        return (
            <AuthUserContext.Provider value={authUser}>
                <Component {...props} />
            </AuthUserContext.Provider>
        )
    }
    return withFirebase(HOC);
}

export default withAuthentication;