import React from 'react';
import styled, { keyframes } from 'styled-components';
import TimelineItem from './TimelineItem';
import emoji from 'react-easy-emoji';
import moment from 'moment';

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-40px);
    }
`;

const NoEntries = styled.div`width: 40%;`;

const Point = styled.div`font-size: 64px;`;

const PointAnimated = styled.div`
    animation: ${bounce} 2s linear infinite;
    font-size: 64px;
`;

const TimelineContainer = styled.ul`
    list-style: none;
    margin: 2em;
    padding: 0;
    width: 40%;
`;

const InlineButton = styled.button`
    background: none;
    border: none;
    box-shadow: none;
    color: #ff5f6d;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
    text-decoration: underline;
`;

const Timeline = props => {
    const { date, entries } = props;

    if (entries.length) {
        return (
            <TimelineContainer>
                {entries
                    .map((entry, key) =>
                        <TimelineItem
                            i={key}
                            key={entry.id}
                            length={entries.length}
                            entry={entry}
                        />
                    )
                    .reverse()}
            </TimelineContainer>
        );
    } else if (date.format('MM Do YY') !== moment().format('MM Do YY')) {
        return (
            <NoEntries>
                <Point>
                    {emoji('🚫')}
                </Point>
                <h2>This date has passed.</h2>
                <InlineButton onClick={props.goToToday}>
                    Go to today.
                </InlineButton>
            </NoEntries>
        );
    } else {
        return (
            <NoEntries>
                <PointAnimated>
                    {emoji('👆')}
                </PointAnimated>
                <h2>Add your first entry for today.</h2>
            </NoEntries>
        );
    }
};

export default Timeline;
