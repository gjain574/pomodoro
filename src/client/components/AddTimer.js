import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios').default;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 16px 20px;
    margin-bottom: 20px;
    border-radius: 2px;
    min-width: 700px;
`;

const Input = styled.input`
    outline: none !important;
    border: none;
    font-size: 18px;
    min-width: 500px;
`;

const RightBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DefaultTimer = styled.div`
    color: #D0D2D3;
    font-size: 18px;
    font-weight: 600;
    margin-right: 20px;
`;

const Button = styled(FontAwesomeIcon)`
    margin-right: 10px;
    cursor: pointer;
    font-size: 25px;
    
    & path {
        fill : #92e663
    }

    &:hover {
        & path {
            fill : #49ca00;;
        }
    }

    &:focus {
        & path {
            fill : #49ca00;
        }
    }
`;

const AddTimer = ({ handleOnAdd }) => {

    const [name, setName] = useState('');

    const handleAdd = () => {
        return axios.post('/api/v1/timers', {
            'name' : name
        }).then(({ data }) => {
            if (data.status === "success"){
                setName('');
                handleOnAdd();
            }
        });
    }

    return (
        <Wrapper>
            <Input placeholder="What are you working on ?" value={name} onChange={ (e) => { setName(e.target.value) } } />
            <RightBar>
                <DefaultTimer>0 : 25 : 00</DefaultTimer>
                <Button icon={faPlusCircle} onClick={handleAdd} />
            </RightBar>
        </Wrapper>
    );
}

export default AddTimer;
