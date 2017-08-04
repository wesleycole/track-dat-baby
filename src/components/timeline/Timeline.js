import React from 'react';
import styled from 'styled-components';
import TimelineItem from './TimelineItem';

const TimelineContainer = styled.ul`
    list-style: none;
    margin: 2em;
    padding: 0;
`;

const Timeline = props => {
    const { entries } = props;

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
};

export default Timeline;
