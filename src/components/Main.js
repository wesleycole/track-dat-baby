import React from 'react';
import AddEntry from './AddEntry';
import EntriesListWithData from './EntriesList';
import styled from 'styled-components';

const Container = styled.div`padding: 1em;`;

const Main = () => {
    <Container>
        <AddEntry {...this.props} />
        <EntriesListWithData />
    </Container>;
};
