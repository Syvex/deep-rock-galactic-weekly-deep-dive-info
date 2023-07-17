import React from 'react';
import './style.css';

const App = () => {
  const [apiData, setApiData] = React.useState();

  const getDeepDives = React.useCallback(() => {
    const proxyUrl = 'https://cors.bridged.cc/'; // CORS-Proxy-Service

    fetch(proxyUrl + 'https://drgapi.com/v1/deepdives')
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((error) => console.log(error));
  });

  console.log(apiData);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <button onClick={() => getDeepDives()}>get deep dives</button>
    </div>
  );
};

export default App;
