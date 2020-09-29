import React, { useReducer } from 'react';
import styled from 'styled-components';
import { withFirebase } from '../contexts/FirebaseContext';

import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import * as ROUTES from '../constants/routes'; 

const StyledWrap = styled.div`
    margin-top: 8rem;

`;

const INITIAL_STATE = {
    email: '',
    username: '',
    passwordOne: '',
    passwordTwo: '',
    zipcode: '',
    error: null
}

const ACTIONS = {
    SET_EMAIL: 'email',
    SET_USERNAME: 'username',
    SET_PASSWORD_ONE: 'passwordOne',
    SET_PASSWORD_TWO: 'passwordTwo',
    SET_ZIPCODE: 'zipcode',
    SET_ERROR: 'error'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_EMAIL:
            return {...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_USERNAME:
            return {...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_PASSWORD_ONE:
            return {...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_PASSWORD_TWO:
            return {...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_ZIPCODE:
            return {...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_ERROR:
            return {...state, [action.payload.field]: action.payload.value}
    }
}

const SignUp = ({ firebase, history }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const { email, username, passwordOne, passwordTwo, zipcode, error } = state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      zipcode === '' ||
      username === '';

      const onSubmit = (event) => {
        firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            return firebase.user(authUser.user.uid).set({ username, email, zipcode, websites: [''] });
        })
        .then(() => {
            dispatch({ type: ACTIONS.SET_EMAIL, payload: {
                field: ACTIONS.SET_EMAIL, value: email
            }})
            dispatch({ type: ACTIONS.SET_USERNAME, payload: {
                field: ACTIONS.SET_USERNAME, value: username
            }})
            dispatch({ type: ACTIONS.SET_PASSWORD_ONE, payload: {
                field: ACTIONS.SET_PASSWORD_ONE, value: passwordOne
            }})
            dispatch({ type: ACTIONS.SET_PASSWORD_TWO, payload: {
                field: ACTIONS.SET_PASSWORD_TWO, value: passwordTwo
            }})

           history.push(ROUTES.HOME);
        })
        .catch(error => {
            console.log(error)
            dispatch({ type: ACTIONS.SET_ERROR, payload: {
                field: ACTIONS.SET_ERROR, value: error
            }})
        })

        event.preventDefault();
      }

      const onChange = (e) => {
        dispatch({ type: e.target.name, payload: { field: e.target.name, value: e.target.value }})
    }

    return (
        <StyledWrap className="container">
        <Jumbotron>
        <h1>Sign Up</h1>
        <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <input className="form-control" name="username" value={username} onChange={onChange} type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <input className="form-control" name="email" value={email} onChange={onChange} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input className="form-control" name="passwordOne" value={passwordOne} onChange={onChange} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <input className="form-control" name="passwordTwo" value={passwordTwo} onChange={onChange} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicZipcode">
            <Form.Label>Zipcode</Form.Label>
            <input className="form-control" name="zipcode" value={zipcode} onChange={onChange} type="zipcode" placeholder="Zipcode" />
        </Form.Group>
        <Button variant="primary" disabled={isInvalid} type="submit">
            Submit
        </Button>
        {error && <p>{error.message}</p>}
        </Form>
        </Jumbotron>
        </StyledWrap>
    )
}

export default withFirebase(SignUp);