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

export const entriesListQuery = gql`
    query paginateEntries($startDate: DateTime, $endDate: DateTime) {
        user {
            id
            entries(filter: { time_lte: $endDate, time_gte: $startDate }) {
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
