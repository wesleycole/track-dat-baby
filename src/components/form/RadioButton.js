import React from 'react';

const RadioButton = props => {
    return (
        <label>
            <input
                type="radio"
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.label}
        </label>
    );
};

export default RadioButton;
