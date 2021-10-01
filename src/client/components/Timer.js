import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    background-color: white;
    padding: 8px 16px;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    min-width: 400px;
`;

const Name = styled.div`
    font-size: 20px;
`;

const Counter = styled.div`

`;

const Timer = () => {
  return (
    <Wrapper>
        <Name>
            Hello
        </Name>
        <div>
            10: 30
        </div>
    </Wrapper>
  );
}

export default Timer;
