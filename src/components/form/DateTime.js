import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

class DateTime extends React.Component {
    state = {
        value: moment()
    };

    handleValueChange = value => {
        this.setState({ value });
    };

    render() {
        return (
            <div>
                <TimePicker
                    defaultValue={this.state.value}
                    onChange={this.handleValueChange}
                    use12Hours={true}
                    showSecond={false}
                />
            </div>
        );
    }
}

export default DateTime;
