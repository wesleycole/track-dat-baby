import React from 'react';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import AddEntry from './AddEntry';
import EntriesListWithData from './EntriesList';
import LoginAuth from './LoginAuth';
import moment from 'moment';

const Container = styled.div`padding: 1em;`;

class App extends React.Component {
    static propTypes = {
        history: React.PropTypes.object.isRequired,
        data: React.PropTypes.object.isRequired
    };

    state = {
        date: moment()
    };

    _logout = () => {
        window.localStorage.removeItem('auth0IdToken');
        window.location.reload();
    };

    _isLoggedIn = () => {
        return this.props.data.user;
    };

    _goBack = () => {
        this.setState({
            date: this.state.date.subtract(1, 'days')
        });
    };

    _goForward = () => {
        this.setState({
            date: this.state.date.add(1, 'days')
        });
    };

    _goToToday = () => {
        this.setState({
            date: moment()
        });
    };

    render() {
        console.log(this.state);
        let content = <LoginAuth />;

        if (this._isLoggedIn()) {
            content = (
                <Container>
                    <AddEntry {...this.props} />
                    <div>
                        <button onClick={this._goBack}>Prev</button>
                        <button onClick={this._goToToday}>Today</button>
                        <button onClick={this._goForward}>Next</button>
                    </div>
                    <EntriesListWithData
                        startDate={this.state.date.startOf('day').format()}
                        endDate={this.state.date.endOf('day').format()}
                    />
                </Container>
            );
        }
        return (
            <div>
                <Header
                    isLoggedIn={this._isLoggedIn}
                    handleLogout={this._logout}
                />
                {content}
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
