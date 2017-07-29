import React from 'react';
import { gql, graphql } from 'react-apollo';
import emoji from 'react-easy-emoji';
import styled from 'styled-components';

const Button = styled.button`
    align-items: center;
    background: white;
    border: 1px solid #cecece;
    border-radius: 3px;
    box-shadow: none;
    cursor: pointer;
    display: flex;
    font-weight: bold;
    margin-right: 10px;
    padding: 5px 20px;
    transition: background 0.2s ease-in-out;

    &:hover {
        background: #eee;
    }
`;

const Emoji = styled.span`
    font-size: 24px;
    margin-right: 10px;
`;

const AddFeed = ({ mutate }) => {
    const handleClick = e => {
        e.preventDefault();
        mutate({
            variables: { type: 'Breast' }
        });
    };

    return (
        <Button onClick={handleClick}>
            <Emoji>{emoji('🍼')}</Emoji> Track Feeding
        </Button>
    );
};

const addFeedMutation = gql`
    mutation createFeed($type: String!) {
        createFeed(type: $type) {
            id
            type
        }
    }
`;

const AddFeedWithMutation = graphql(addFeedMutation)(AddFeed);

export default AddFeedWithMutation;
