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
    password: '',
    error: null
}

const ACTIONS = {
    SET_EMAIL: 'email',
    SET_PASSWORD: 'password',
    SET_ERROR: 'error'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_EMAIL:
            return {...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_PASSWORD:
            return {...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_ERROR:
            return {...state, [action.payload.field]: action.payload.value}
    }
}

const SignIn = ({ firebase, history }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const { email, password, error } = state;

    const isInvalid = password === '' || email === '';

    const onSubmit = (event) => {
        firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch({ type: ACTIONS.SET_EMAIL, payload: {
                field: ACTIONS.SET_EMAIL, value: email
            }})
            dispatch({ type: ACTIONS.SET_PASSWORD, payload: {
                field: ACTIONS.PASSWORD, value: password
            }})
            history.push(ROUTES.HOME);
        })
        .catch(e => {
            dispatch({ type: ACTIONS.SET_ERROR, payload: {
                field: ACTIONS.SET_ERROR, value: e
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
        <h1>Sign In</h1>
        <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <input className="form-control" name="email" value={email} onChange={onChange} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input className="form-control" name="password" value={password} onChange={onChange} type="password" placeholder="Password" />
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

export default withFirebase(SignIn);