import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';


const StyledWrap = styled.div`
    width: 70%;
    margin: 7rem auto;

`;

const Landing = () => {
    return (
      <StyledWrap>
        <Jumbotron>
          <h1>Hello!</h1>
          <p>
          You can save and bookmark your favorite websites. You can also check the weather forecast for the next week! Create an account to start!
          </p>
          </Jumbotron>
      </StyledWrap>
    )
};

export default Landing;