import React from 'react';
import './style.css';
import DeepDiveList from './DeepDiveList';

const App = () => {
  const corsProxyServices = [
    'https://cors.bridged.cc/g',
    'https://crossorigin.me/g',
    'https://thingproxy.freeboard.io/fetch/g',
    'https://yacdn.org/proxy/g',
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
