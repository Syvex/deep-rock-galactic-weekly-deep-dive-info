import React from 'react';
import './style.css';

const DeepDiveList = () => {
  const [apiData, setApiData] = React.useState();

  const getDeepDives = React.useCallback(() => {
    /* other cors proxy services (in case one doesn't work):
    - https://crossorigin.me/
    - https://cors.bridged.cc/
    - https://thingproxy.freeboard.io/fetch/
    - https://yacdn.org/proxy/
    */
    const proxyUrl = 'https://cors.bridged.cc/'; // CORS-Proxy-Service

    fetch(proxyUrl + 'https://drgapi.com/v1/deepdives')
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((error) => console.log(error));
  });

  console.log(apiData);

  return (
    <div>
      <button onClick={() => getDeepDives()}>get deep dives</button>
    </div>
  );
};

export default DeepDiveList;
