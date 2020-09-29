import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

import withAuthorization from './Session/withAuthorization';
import EditWebsiteModal from './EditWebsiteModal';

const StyledWrap = styled.div`
    width: 70%;
    margin-top: 8rem;

`;

const ACTIONS = {
    SET_WEBSITE: 'website',
    SET_WEBSITES: 'websites',
    SET_EDITSITE: 'editSite'
}

const INITIAL_STATE = {
    website: '',
    websites: [],
    editSite: false
}

const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.SET_WEBSITE:
            return { ...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_WEBSITES:
            return { ...state, [action.payload.field]: action.payload.value}
        case ACTIONS.SET_EDITSITE:
            return { ...state, [action.payload.field]: action.payload.value}
    }
}

const Bookmarks = ({ firebase }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { website, websites, editSite } = state;
    const userId = firebase.auth.currentUser.uid;

    const onChange = (e) => {
        dispatch({ type: e.target.name, payload: { field: e.target.name, value: e.target.value }})
    }

    useEffect(() => {
        const userId = firebase.auth.currentUser.uid;

        const getWebsites = async () => {
            const savedWebsites = await firebase.getUserInfo(userId, 'websites');
            
            if (savedWebsites) {
                dispatch({ type: ACTIONS.SET_WEBSITES, payload: {
                    field: ACTIONS.SET_WEBSITES, value: savedWebsites
                }})
            }
        }
        getWebsites();
    }, [])

    const onSubmit = (e) => {
        dispatch({ type: ACTIONS.SET_WEBSITES, payload: {
            field: ACTIONS.SET_WEBSITES, value: [...websites, website]
        }})
        
        firebase.updateProperty(userId, {websites: [...websites, website]});

        e.preventDefault();
    }

    const removeWebsite = (index) => {
        const values = [...websites];
        values.splice(index, 1)
        dispatch({ type: ACTIONS.SET_WEBSITES, payload: {
            field: ACTIONS.SET_WEBSITES, value: values
        }})
        firebase.updateProperty(userId, {websites: values})
    }

    const editWebsite = (newSite, index) => {
        let newSites = [...websites]
        newSites[index] = newSite;
        console.log(newSites)
        dispatch({ type: ACTIONS.SET_WEBSITES, payload: {
            field: ACTIONS.SET_WEBSITES, value: newSites
        }})
        firebase.updateProperty(userId, {websites: newSites})
    }
    
    return (
        <StyledWrap className="container">
            <h1 className="display-4 text-center">Saved Websites</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Website</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    { websites.map((site, index) => {
                    return (
                        <tr key={index}>
                            <td className="ui header">{index}</td>
                            <td>
                                <input className="form-control" type="text" value={site} readOnly/>
                            </td>
                            <td>
                                <button className="btn btn-danger" type="button" onClick={() => removeWebsite(index)}><FontAwesomeIcon icon={faTimesCircle} /></button>
                                {/* <button className="btn btn-warning mx-1" type="button" onClick={(event) => editWebsite(event, index)}><FontAwesomeIcon icon={faEdit} /></button> */}
                                <EditWebsiteModal editSite={editWebsite} index={index} />
                            </td>
                        </tr>
                    )})
                    }
                </tbody>
            </Table>
            <Form onChange={onChange} onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Enter a Website to save</Form.Label>
                    <input name="website" className="form-control" type="text" placeholder="Website" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </StyledWrap>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Bookmarks);