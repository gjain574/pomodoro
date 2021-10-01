import React from 'react';
import styled, { css } from 'styled-components';
import Timer from '../components/Timer';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: #F1F1F1;
  padding: 32px;
`;

const App = () => {
  return (
    <Wrapper>
      <Timer />
    </Wrapper>
  );
}

export default App;
