import React, { useState, useEffect, useContext } from 'react';

import * as ROUTES from '../../constants/routes';
import FirebaseContext, { withFirebase } from '../../contexts/FirebaseContext';
import AuthUserContext from '../../contexts/AuthUserContext';

const withAuthorization = condition => Component => {
    const HOC = props => {
        const [authUser, setAuthUser] = useState(null);
        const firebase = useContext(FirebaseContext);

        useEffect(() => {
            firebase.auth.onAuthStateChanged(authUser => {
                if (!condition(authUser)) {
                    setAuthUser(null);
                   return props.history.push(ROUTES.SIGN_IN);
                }
                authUser ? setAuthUser(authUser) : setAuthUser(null);
            })
        }, [firebase.auth])

        return (
            <AuthUserContext.Consumer>
                {
                    authUser => condition(authUser) ? <Component {...props} /> : null
                }
            </AuthUserContext.Consumer>
        )
    }
    return withFirebase(HOC);
}

export default withAuthorization;
