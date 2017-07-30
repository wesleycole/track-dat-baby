import React from 'react';
import { gql, graphql } from 'react-apollo';
import Modal from 'react-modal';
import emoji from 'react-easy-emoji';
import styled from 'styled-components';
import RadioGroup from './form/RadioGroup';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { entriesListQuery } from './EntriesList';
import 'rc-time-picker/assets/index.css';

const customStyles = {
    content: {
        border: '1px solid #eee',
        boxShadow: '4px 4px 20px rgba(0,0,0,0.1)',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: 0,
        transform: 'translate(-50%, -50%)',
        width: 320
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    }
};

const TrackButton = styled.button`
    background: linear-gradient(to right, #ff5f6d, #ffc371);
    border: none;
    border-radius: 3px;
    box-shadow: none;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 10px 20px;
    transition: background 0.3s ease-in-out;
`;

const ModalContent = styled.div`padding: 1.5em;`;

const SaveButton = styled.button`
    background: linear-gradient(to right, #ff5f6d, #ffc371);
    border: none;
    box-shadow: none;
    color: #fff;
    cursor: pointer;
    display: block;
    width: 100%;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 20px 20px;
    text-transform: uppercase;
    transition: background 0.3s ease-in-out;
`;

const ParentButtons = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TypeButton = styled.button`
    background: #fff;
    border: 1px solid #eee;
    border-radius: 3px;
    box-shadow: none;
    flex: 1;
    font-size: 24px;
    margin-right: 0.5em;
    outline: none;
    padding: 10px 10px;

    &:last-child {
        margin-right: 0;
    }
`;

const Form = styled.form`margin-top: 1em;`;

class AddEntry extends React.Component {
    state = {
        modalIsOpen: true,
        parentType: '',
        childType: '',
        editTime: false,
        time: moment()
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    showChildType = parentType => {
        this.setState({
            parentType: parentType
        });
    };

    handleValueChange = e => {
        this.setState({ childType: e.target.value });
    };

    handleTimeChange = value => {
        this.setState({ time: value });
    };

    showTimePicker = () => {
        this.setState({ editTime: true });
    };

    saveEntry = e => {
        let enteredTime = new Date();

        if (this.state.enteredTime != null) {
            enteredTime = this.state.enteredTime;
        }

        this.props.mutate({
            variables: {
                parentType: this.state.parentType,
                childType: this.state.childType,
                time: enteredTime,
                userId: this.props.data.user.id
            },
            update: (store, { data: { createEntry } }) => {
                const data = store.readQuery({ query: entriesListQuery });
                data.user.entries.push(createEntry);
                store.writeQuery({ query: entriesListQuery, data });
            }
        });

        this.setState({
            modalIsOpen: false
        });
    };

    render() {
        const { parentType } = this.state;
        let childOutput = '';
        if (parentType === 'diaper') {
            childOutput = (
                <RadioGroup
                    name="foo"
                    value={this.state.childType}
                    choices={[
                        { value: 'poop', label: 'Poop' },
                        { value: 'pee', label: 'Pee' },
                        { value: 'both', label: 'Both' }
                    ]}
                    onChange={this.handleValueChange}
                />
            );
        } else if (parentType === 'feed') {
            childOutput = (
                <RadioGroup
                    name="foo"
                    value={this.state.childType}
                    choices={[
                        { value: 'breast', label: 'Breast' },
                        { value: 'bottle', label: 'Bottle' }
                    ]}
                    onChange={this.handleValueChange}
                />
            );
        }

        let time = (
            <button onClick={this.showTimePicker}>
                {emoji('⏰')} Edit the Time
            </button>
        );

        if (this.state.editTime) {
            time = (
                <TimePicker
                    defaultValue={this.state.time}
                    onChange={this.handleTimeChange}
                    use12Hours={true}
                    showSecond={false}
                />
            );
        }
        return (
            <div>
                <TrackButton onClick={this.openModal}>
                    Track dat baby!
                </TrackButton>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Entry Modal"
                >
                    <ModalContent>
                        <ParentButtons>
                            <TypeButton
                                onClick={() => this.showChildType('diaper')}
                            >
                                {emoji('💩')}
                            </TypeButton>
                            <TypeButton
                                onClick={() => this.showChildType('feed')}
                            >
                                {emoji('🍼')}
                            </TypeButton>
                        </ParentButtons>
                        {childOutput}
                        {time}
                    </ModalContent>
                    <SaveButton onClick={this.saveEntry}>Save</SaveButton>
                </Modal>
            </div>
        );
    }
}

const addEntryMutation = gql`
    mutation createEntry(
        $parentType: String!
        $childType: String!
        $time: DateTime
        $userId: ID!
    ) {
        createEntry(
            parentType: $parentType
            childType: $childType
            time: $time
            userId: $userId
        ) {
            id
            parentType
            childType
            time
            user {
                id
            }
        }
    }
`;

const AddEntryWithMutation = graphql(addEntryMutation)(AddEntry);

export default AddEntryWithMutation;
