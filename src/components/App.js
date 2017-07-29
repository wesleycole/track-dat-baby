import React from 'react';
import LoginAuth from './LoginAuth';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import AddEntry from './AddEntry';

const Main = styled.div`padding: 1em;`;

class App extends React.Component {
    static propTypes = {
        history: React.PropTypes.object.isRequired,
        data: React.PropTypes.object.isRequired
    };

    _logout = () => {
        window.localStorage.removeItem('auth0IdToken');
        window.location.reload();
    };

    _isLoggedIn = () => {
        return this.props.data.user;
    };

    renderLoggedIn = () => {
        return <p>Logged In</p>;
    };

    renderLoggedOut = () => {
        return <p>Logged Out</p>;
    };

    render() {
        return (
            <div>
                <Header
                    isLoggedIn={this._isLoggedIn}
                    handleLogout={this._logout}
                />
                <Main>
                    <AddEntry {...this.props} />
                </Main>
            </div>
        );
    }
}

const userQuery = gql`
    query userQuery {
        user {
            id
        }
    }
`;

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
    withRouter(App)
);
