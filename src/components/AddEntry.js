import React from 'react';
import styled from 'styled-components';
import AddFeedWithMutation from './AddFeed';
import AddChange from './AddChange';

const ButtonContainer = styled.div`display: flex;`;

const AddEntry = () => {
    return (
        <ButtonContainer>
            <AddFeedWithMutation />
            <AddChange />
        </ButtonContainer>
    );
};

export default AddEntry;
