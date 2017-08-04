import React from 'react';
import { gql, graphql } from 'react-apollo';
import Timeline from './timeline/Timeline';
import Reports from './reports/Reports';
import styled from 'styled-components';

const Container = styled.div`display: flex;`;

const EntriesList = ({ data: { loading, error, user } }) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return (
            <p>
                {error.message}
            </p>
        );
    }
    return (
        <Container>
            <Timeline entries={user.entries} />
            <Reports entries={user.entries} />
        </Container>
    );
};

const now = new Date();

export const entriesListQuery = gql`
    query {
        user {
            id
            entries {
                id
                parentType
                childType
                time
            }
        }
    }
`;

const EntriesListWithData = graphql(entriesListQuery)(EntriesList);

export default EntriesListWithData;
