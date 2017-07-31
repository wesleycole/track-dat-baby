import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
    background: #fff;
    border: 1px solid ${props => (props.checked ? '#ff5f6d' : '#eee')};
    color: ${props => (props.checked ? '#ff5f6d' : '#333')};
    cursor: pointer;
    display: block;
    margin-top: 10px;
    padding: 1em;
    text-align: center;
    transition: all 0.1s ease-in-out;
`;

const Input = styled.input`
    height: 0;
    opacity: 0;
    visibility: hidden;
    width: 0;
`;

const RadioButton = props => {
    return (
        <Label checked={props.checked}>
            <Input
                type="radio"
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.label}
        </Label>
    );
};

export default RadioButton;
