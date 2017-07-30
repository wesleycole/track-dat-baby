import React from 'react';
import { Timeline } from 'antd';
import emoji from 'react-easy-emoji';
// import 'antd/lib/timeline/style/css';

const EntryTimeline = ({ data: { loading, error, all } }) => {
    return (
        <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>
                Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item dot={emoji('💩')}>
                Network problems being solved 2015-09-01
            </Timeline.Item>
        </Timeline>
    );
};

export default EntryTimeline;
