import React from 'react';
import { gql, graphql } from 'react-apollo';

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
        <ul>
            {user &&
                user.entries.map(entry =>
                    <li key={entry.id}>
                        {entry.parentType}
                        {entry.childType}
                    </li>
                )}
        </ul>
    );
};

export const entriesListQuery = gql`
    query {
        user {
            id
            entries {
                id
                parentType
                childType
            }
        }
    }
`;
const EntriesListWithData = graphql(entriesListQuery)(EntriesList);

export default EntriesListWithData;
