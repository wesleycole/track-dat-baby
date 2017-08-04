import React from 'react';
import { gql, graphql } from 'react-apollo';
import Timeline from './timeline/Timeline';

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
        <div>
            <Timeline entries={user.entries} />
        </div>
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
