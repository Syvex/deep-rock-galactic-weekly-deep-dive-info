import React from 'react';
import './style.css';
import DeepDiveList from './DeepDiveList';

const App = () => {
  const corsProxyServices = [
    'https://cors.bridged.cc/',
    'https://crossorigin.me/',
    'https://thingproxy.freeboard.io/fetch/',
    'https://yacdn.org/proxy/',
    'https://cors.bridged.cc/',
  ];

  return (
    <div>
      <h1>ROCK AND STONE</h1>
      <DeepDiveList corsProxies={corsProxyServices} />
    </div>
  );
};

export default App;
