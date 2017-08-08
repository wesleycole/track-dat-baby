import React from 'react';
import styled from 'styled-components';
import emoji from 'react-easy-emoji';

const Container = styled.div`width: 60%;`;

const Counts = styled.div`
    display: flex;
    width: 100%;
`;

const Count = styled.div`
    align-items: center;
    border: 1px solid #eee;
    border-radius: 3px;
    color: #333;
    display: flex;
    font-size: 64px;
    font-weight: bold;
    justify-content: center;
    margin-right: 0.5em;
    width: 50%;

    &:last-child {
        margin-right: 0;
    }
`;

const CountLabel = styled.span`
    color: #ccc;
    display: block;
    font-size: 14px;
    text-transform: uppercase;
`;

const ParentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
`;

const ChildContainer = styled.div`
    align-items: center;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
`;

const ChildCount = styled.div`
    border-right: 1px solid #eee;
    flex: 1;
    font-size: 20px;
    padding: 1em;
    text-align: center;

    &:last-child {
        border-right: none;
    }
`;

const ParentCount = styled.div`
    padding: 0.5em;
    text-align: center;
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

    const numPoops = entries.filter(entry => {
        if (entry.childType === 'poop') {
            return entry;
        }
    }).length;

    const numPees = entries.filter(entry => {
        if (entry.childType === 'pee') {
            return entry;
        }
    }).length;

    const numBoth = entries.filter(entry => {
        if (entry.childType === 'both') {
            return entry;
        }
    }).length;

    const numBreast = entries.filter(entry => {
        if (entry.childType === 'breast') {
            return entry;
        }
    }).length;

    const numBottle = entries.filter(entry => {
        if (entry.childType === 'bottle') {
            return entry;
        }
    }).length;

    return (
        <Container>
            <Counts>
                <Count>
                    <ParentContainer>
                        <ParentCount>
                            {numDiapers}
                            <CountLabel>
                                {emoji('💩')} Diaper Changes
                            </CountLabel>
                        </ParentCount>
                        <ChildContainer>
                            <ChildCount>
                                {numPoops}
                                <CountLabel>Poops</CountLabel>
                            </ChildCount>
                            <ChildCount>
                                {numPees}
                                <CountLabel>Pees</CountLabel>
                            </ChildCount>
                            <ChildCount>
                                {numBoth}
                                <CountLabel>Both</CountLabel>
                            </ChildCount>
                        </ChildContainer>
                    </ParentContainer>
                </Count>
                <Count>
                    <ParentContainer>
                        <ParentCount>
                            {numFeeds}
                            <CountLabel>
                                {emoji('🍼')} Feeds
                            </CountLabel>
                        </ParentCount>
                        <ChildContainer>
                            <ChildCount>
                                {numBreast}
                                <CountLabel>Breast</CountLabel>
                            </ChildCount>
                            <ChildCount>
                                {numBottle}
                                <CountLabel>Bottle</CountLabel>
                            </ChildCount>
                        </ChildContainer>
                    </ParentContainer>
                </Count>
            </Counts>
        </Container>
    );
};

export default Reports;
