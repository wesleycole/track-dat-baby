import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Counts = styled.div`display: flex;`;

const Count = styled.div`
    align-items: center;
    border: 1px solid #eee;
    border-radius: 3px;
    color: #ffc371;
    display: flex;
    font-size: 64px;
    font-weight: bold;
    justify-content: center;
    margin-right: 0.5em;
    padding: 20px;
    height: 150px;
    width: 150px;
`;

const CountLabel = styled.span`
    color: #ccc;
    display: block;
    font-size: 14px;
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
                    <div>
                        {numDiapers}
                        <CountLabel>Diapers</CountLabel>
                    </div>
                </Count>
                <Count>
                    <div>
                        {numFeeds}
                        <CountLabel>Feeds</CountLabel>
                    </div>
                </Count>
            </Counts>
        </Container>
    );
};

export default Reports;
