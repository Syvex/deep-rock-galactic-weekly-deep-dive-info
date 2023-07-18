import React from 'react';
import './style.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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

            <TableContainer sx={{ maxWidth: 800 }} component={Paper}>
              <Table aria-label="ddtable">
                <TableHead>
                  <TableRow>
                    <TableCell>Stage</TableCell>
                    <TableCell align="right">Primary</TableCell>
                    <TableCell align="right">Secondary</TableCell>
                    <TableCell align="right">Warning</TableCell>
                    <TableCell align="right">Anomaly</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deepDive.stages.map((stage, stageIndex) => (
                    <TableRow key={stageIndex}>
                      <TableCell component="th" scope="row">
                        {stage.id}
                      </TableCell>
                      <TableCell align="right">{stage.primary}</TableCell>
                      <TableCell align="right">{stage.secondary}</TableCell>
                      <TableCell align="right">{stage.warning}</TableCell>
                      <TableCell align="right">{stage.anomaly}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeepDiveList;
