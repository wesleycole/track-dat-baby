import React from 'react';
import LoginAuth from './LoginAuth';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Header from './Header';

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

    render() {
        return (
            <Header isLoggedIn={this._isLoggedIn} handleLogout={this._logout} />
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
