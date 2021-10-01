import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Countdown from 'react-countdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faPlayCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios').default;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 16px 20px;
    margin-bottom: 20px;
    border-radius: 16px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    min-width: 700px;
`;

const Name = styled.div`
    font-size: 20px;
`;

const RightBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Counter = styled.div`
    font-weight: 600;
    font-size: 20px;
    margin-right: 30px;
`;

const Controls = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled(FontAwesomeIcon)`
    margin-right: 10px;
    cursor: pointer;
    font-size: 18px;
    
    & path {
        fill : #D0D2D3;
    }

    ${props => props.active && props.active === 'true' && css`
        & path {
            fill : #717D85;
        }
    `}

    &:hover {
        & path {
            fill : #717D85;
        }
    }

    &:focus {
        & path {
            fill : #717D85;
        }
    }
`;

const timeRenderer = ({ hours, minutes, seconds, completed }) => {
    return <Counter>{ hours } : { minutes } : { seconds }</Counter>;
};

const Timer = ({ id, name = '', status, timeLeft = 0, refreshState }) => {

    const [ timerStatus, setTimerStatus ] = useState(status);
    const clockRef = useRef();

    const handlePause = async (id) => {
        const { data } = await axios.put(`/api/v1/timers/${id}`, {
            status: 'paused'
        });

        if (data.status === "success" && data.timer.status === "paused"){
            clockRef.current.pause();
            setTimerStatus('paused');
        }
    }

    const handleStart = async (id) => {
        const { data } = await axios.put(`/api/v1/timers/${id}`, {
            status: 'resumed'
        });

        if (data.status === "success" && data.timer.status === "resumed"){
            clockRef.current.start();
            setTimerStatus('resumed');
        }
    }

    const handleDelete = async (id) => {
        await axios.delete(`/api/v1/timers/${id}`);
        refreshState();
    }

    return (
        <Wrapper>
            <Name>{ name }</Name>
            <RightBar>
                <Countdown 
                    date={Date.now() + timeLeft}
                    renderer={timeRenderer}
                    ref={clockRef}
                />
                <Controls>
                    <Button icon={faPauseCircle} active={(timerStatus === 'paused').toString()} onClick={() => { handlePause(id) }} />
                    {
                        ( timerStatus === "paused" || timerStatus === "resumed" ) ? (
                            <Button icon={faPlayCircle} active={(timerStatus ==='resumed').toString()} onClick={() => { handleStart(id) }} />
                        )
                        :
                        null
                    }
                    <Button icon={faTrash} onClick={() => { handleDelete(id) }} />
                </Controls>
            </RightBar>
        </Wrapper>
    );
}

export default Timer;
