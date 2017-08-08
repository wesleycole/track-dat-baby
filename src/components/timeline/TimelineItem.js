import React from 'react';
import styled from 'styled-components';
import emoji from 'react-easy-emoji';
import moment from 'moment';

const Item = styled.li`
    list-style: none;
    margin: 0;
    padding: 0 0 20px 20px;
    position: relative;
`;

const Tail = styled.div`
    border-left: 2px solid #e9e9e9;
    height: 100%;
    left: 5px;
    position: absolute;
    top: 0;
`;

const Head = styled.div`
    border: 0;
    border-radius: 0;
    font-size: 20px;
    height: auto;
    left: -13px;
    line-height: 1;
    margin-top: 6px;
    padding: 3px 0;
    position: absolute;
    text-align: center;
    transform: translateY(-50%);
    width: 40px;
`;

const Content = styled.div`
    font-size: 16px;
    font-weight: bold;
    padding: 0 0 10px 24px;
    position: relative;
    text-transform: uppercase;
    top: -3px;
`;

const Time = styled.div`
    color: #ccc;
    font-size: 16px;
    text-transform: none;
`;

const TimelineItem = props => {
    const { entry } = props;
    let icon = emoji('💩');

    if (entry.parentType === 'feed') {
        icon = emoji('🍼');
    }

    const child = entry.childType
        .toLowerCase()
        .replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

    const time = moment(entry.time).format('hh:mm a');

    return (
        <Item>
            <Tail />
            <Head>
                {icon}
            </Head>
            <Content>
                {child}
                <Time>
                    {time}
                </Time>
            </Content>
        </Item>
    );
};

export default TimelineItem;
