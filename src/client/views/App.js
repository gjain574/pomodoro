import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Timer from '../components/Timer';
import AddTimer from '../components/AddTimer';

const axios = require('axios').default;

const Wrapper = styled.div`
  background: #F1F1F1;
  padding: 32px 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const App = () => {
  const [ timers, setTimers ] = useState([]);

  const fetchTimers = async () => {
    const response = await axios.get('/api/v1/timers');
    if (response.data.status === 'success'){
      setTimers(response.data.timers)
    }
  }

  useEffect(() => {
    fetchTimers();
  }, []);

  return (
    <Wrapper>
      <AddTimer handleOnAdd={() => { fetchTimers() }} />
      { 
        timers.length > 0 ? ( <h3>Timers List ⏱️</h3> ) : <h3>Create some Timers ☝️</h3>
      }
      {
        timers.map(({ id, name, duration, time_remaining, status }, index) => {
          return (<Timer 
                    key={ index } 
                    id={id} 
                    name={ name } 
                    status={ status }
                    timeLeft={ time_remaining*1000 }
                    duration = { duration } 
                    refreshState={() => { fetchTimers() }}
                  />)
        })
      }
    </Wrapper>
  );
}

export default App;
