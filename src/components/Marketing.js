import React from 'react';
import styled from 'styled-components';

const Container = styled.div`display: flex;`;

const Left = styled.div`
    flex: 1;
    height: calc(100vh - 65px);
    padding: 1em 2em;
    width: 50%;
`;

const LeftContent = styled.div``;

const Signup = styled.a`
    background: #fff;
    border-left: 3px solid #ff5f6d;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.3);
    color: #ff5f6d;
    display: block;
    font-weight: bold;
    margin-left: 2em;
    padding: 2em 3em;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    width: 120%;
`;

const Right = styled.div`
    background: linear-gradient(to right, #ff5f6d, #ffc371);
    flex: 2;
    height: calc(100vh - 65px);
    width: 50%;
`;

const Marketing = () => {
    return (
        <Container>
            <Left>
                <LeftContent>
                    <h2>Start Tracking Dat Baby!</h2>
                    <Signup href="#">Sign Up to Start Tracking</Signup>
                </LeftContent>
            </Left>
            <Right>
                <h1>Right</h1>
            </Right>
        </Container>
    );
};

export default Marketing;
