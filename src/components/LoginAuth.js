import React, { Component, PropTypes } from 'react';
import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const LoginButton = styled.button`
    background: linear-gradient(to right, #ff5f6d, #ffc371);
    border: none;
    border-radius: 3px;
    box-shadow: none;
    color: #fff;
    cursor: pointer;
    padding: 5px 10px;
`;

class LoginAuth0 extends Component {
    constructor(props) {
        super(props);

        this._lock = new Auth0Lock(props.clientId, props.domain);
    }

    static propTypes = {
        clientId: PropTypes.string.isRequired,
        domain: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired
    };

    componentDidMount() {
        this._lock.on('authenticated', authResult => {
            window.localStorage.setItem('auth0IdToken', authResult.idToken);
            this.props.history.push(`/signup`);
        });
    }

    _showLogin = () => {
        this._lock.show();
    };

    render() {
        return <LoginButton onClick={this._showLogin}>Log in</LoginButton>;
    }
}

export default withRouter(LoginAuth0);
