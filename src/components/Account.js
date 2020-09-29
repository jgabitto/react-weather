import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';

import withAuthorization from './Session/withAuthorization';
import EditInfoModal from './EditInfoModal';

const StyledWrap = styled.div`
    width: 70%;
    margin-top: 8rem;

`;

const INITIAL_STATE = {
    email: '',
    username: '',
    zipcode: ''
}

const Account = ({ firebase }) => {
    const [account, setAccount] = useState(INITIAL_STATE)
    const userId = firebase.auth.currentUser.uid;

    useEffect(() => {
        const getWebsites = async () => {
            const userInfo = await firebase.getUserInfo(userId);
            
            setAccount(userInfo);
        }
        getWebsites();
    }, [])

    const editAccountInfo = (newInfo, key) => {
        let accountInfo = {...account};
        accountInfo[key] = newInfo;
        console.log(accountInfo)
        setAccount(accountInfo)
        firebase.updateProperty(userId, {...accountInfo})
    }

    return (
        <StyledWrap className="container">
            <h1 className="display-4 text-center">Account Information</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Account Categories</th>
                        <th>Account Information</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(account).map((key, index) => {
                            if (key !== 'websites') {
                                return (
                                    <tr key={index}>
                                        <td className="ui header">{key}</td>
                                        <td>
                                            {account[key]}
                                        </td>
                                        <td>
                                            <EditInfoModal editAccountInfo={editAccountInfo} objKey={key} />
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </Table>
        </StyledWrap>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);