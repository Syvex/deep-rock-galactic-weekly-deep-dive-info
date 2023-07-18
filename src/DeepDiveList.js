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
  Button,
  Box,
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
      <Button
        sx={{ mb: 2 }}
        color="primary"
        variant="contained"
        onClick={() => getDeepDives()}
      >
        get deep dive info
      </Button>
      <div>
        {apiData?.variants.map((deepDive, index) => (
          <div key={index}>
            <Box sx={{ pb: 1, display: 'flex', flexDirection: 'column' }}>
              <span>Name: {deepDive.name}</span>
              <span>Biome: {deepDive.biome}</span>
            </Box>
            <TableContainer sx={{ maxWidth: 800, mb: 4 }} component={Paper}>
              <Table aria-label="ddtable">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <h2>{deepDive.type}</h2>
                    </TableCell>
                    <TableCell align="left">Primary</TableCell>
                    <TableCell align="left">Secondary</TableCell>
                    <TableCell align="left">Warning</TableCell>
                    <TableCell align="left">Anomaly</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deepDive.stages.map((stage, stageIndex) => (
                    <TableRow key={stageIndex}>
                      <TableCell align="left" component="th" scope="row">
                        {stage.id}
                      </TableCell>
                      <TableCell align="left">{stage.primary}</TableCell>
                      <TableCell align="left">{stage.secondary}</TableCell>
                      <TableCell align="left">{stage.warning}</TableCell>
                      <TableCell align="left">{stage.anomaly}</TableCell>
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
