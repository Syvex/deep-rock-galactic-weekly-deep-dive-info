import React from 'react';
import './style.css';
import DeepDiveList from './DeepDiveList';

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>ROCK AND STONE</h1>
      <DeepDiveList />
    </div>
  );
};

export default App;
