import React from 'react';
import styled from 'styled-components';

const Container = styled.div`margin: 2em;`;

const Counts = styled.div`display: flex;`;

const Count = styled.div`
    font-size: 32px;
    font-weight: bold;
`;

const CountLabel = styled.span`
    color: #ccc;
    display: block;
    font-size: 14px;
    margin-right: 2em;
    text-transform: uppercase;
`;

const Reports = props => {
    const { entries } = props;
    const numDiapers = entries.filter(entry => {
        if (entry.parentType === 'diaper') {
            return entry;
        }
    }).length;

    const numFeeds = entries.filter(entry => {
        if (entry.parentType === 'feed') {
            return entry;
        }
    }).length;

    return (
        <Container>
            <Counts>
                <Count>
                    {numDiapers}
                    <CountLabel>Diapers</CountLabel>
                </Count>
                <Count>
                    {numFeeds}
                    <CountLabel>Feeds</CountLabel>
                </Count>
            </Counts>
        </Container>
    );
};

export default Reports;
