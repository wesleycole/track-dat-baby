import React from 'react';
import RadioButton from './RadioButton';

class RadioGroup extends React.Component {
    static defaultProps = {
        value: null,
        choiceValueKey: 'value',
        choiceLabelKey: 'label'
    };

    handleChange = e => {
        if (!this.props.onChange) {
            return;
        }

        this.props.onChange(e);
    };

    renderChoice(choice, i) {
        const value = choice[this.props.choiceValueKey];
        const label = choice[this.props.choiceLabelKey];
        return (
            <RadioButton
                key={value}
                name={this.props.name}
                label={label}
                value={value}
                checked={this.props.value === value}
                onChange={this.handleChange}
            />
        );
    }

    render() {
        return (
            <div>
                {this.props.choices.map(this.renderChoice, this)}
            </div>
        );
    }
}

export default RadioGroup;
