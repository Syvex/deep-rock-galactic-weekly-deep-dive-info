import React from 'react';
import './style.css';

const DeepDiveList = ({ corsProxies }) => {
  const [apiData, setApiData] = React.useState();
  let i = 0;

  // going through a list of different cors proxy services until
  // it either succeeds or there are no more entries in the list
  const getDeepDives = React.useCallback(() => {
    fetch(corsProxies[i] + 'https://drgapi.com/v1/deepdives')
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((error) => {
        console.log(error, i);
        i += 1;
        i < corsProxies.length && getDeepDives();
      });
  });

  console.log(apiData);

  return (
    <div>
      <button onClick={() => getDeepDives()}>get deep dives</button>
      <div>
        <h1>Deep Dives</h1>
        {apiData?.variants.map((deepDive, index) => (
          <div key={index}>
            <h2>{deepDive.type}</h2>
            <h3>{deepDive.name}</h3>
            <p>Biome: {deepDive.biome}</p>
            <p>Seed: {deepDive.seed}</p>
            <h4>Stages:</h4>
            <ul>
              {deepDive.stages.map((stage, stageIndex) => (
                <li key={stageIndex}>
                  Stage {stage.id}: {stage.primary}, {stage.secondary},{' '}
                  {stage.warning}, {stage.anomaly}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeepDiveList;
