import React from 'react';
import './style.css';
import DeepDiveList from './DeepDiveList';

const App = () => {
  const corsProxyServices = [
    'https://cors.bridged.cc/',
    'https://crossorigin.me/',
    'https://thingproxy.freeboard.io/fetch/',
    'https://yacdn.org/proxy/',
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>ROCK AND STONE</h1>
      <DeepDiveList corsProxies={corsProxyServices} />
    </div>
  );
};

export default App;
