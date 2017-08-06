import React from 'react';
import styled from 'styled-components';
import emoji from 'react-easy-emoji';
import LoginAuth from './LoginAuth';

const SiteHeader = styled.header`
    align-items: center;
    border-bottom: 1px solid #eee;
    display: flex;
    padding: 1em;
`;

const SiteTitle = styled.h1`
    align-items: center;
    display: flex;
    color: #333;
    margin: 0;
`;

const SiteTitleText = styled.span`
    font-size: 20px;
    margin-left: 10px;
`;

const Buttons = styled.div`margin-left: auto;`;

const LogoutButton = styled.button`
    background: linear-gradient(to right, #ff5f6d, #ffc371);
    border: none;
    border-radius: 3px;
    box-shadow: none;
    color: #fff;
    cursor: pointer;
    padding: 5px 10px;
`;

const Header = props => {
    let button = <LoginAuth />;
    if (props.isLoggedIn()) {
        button = (
            <LogoutButton onClick={props.handleLogout}>Log out</LogoutButton>
        );
    }

    return (
        <SiteHeader>
            <SiteTitle>
                {emoji('👶')}
                <SiteTitleText>Track Dat Baby</SiteTitleText>
            </SiteTitle>
            <Buttons>
                {button}
            </Buttons>
        </SiteHeader>
    );
};

export default Header;
