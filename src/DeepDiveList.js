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
  let [disableInfoBtn, setDisableInfoBtn] = React.useState(false);
  let i = 0;

  // going through a list of different cors proxy services until
  // it either succeeds or there are no more entries in the list
  const getDeepDives = React.useCallback(() => {
    fetch(corsProxies[i] + 'https://drgapi.com/v1/deepdives')
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        // 5s delay once data has been loaded before button is usable again to prevent spam
        setTimeout(() => setDisableInfoBtn(false), 5000);
      })
      .catch((error) => {
        console.log(error, i);
        i += 1;
        (i < corsProxies.length && getDeepDives()) ||
          setTimeout(() => setDisableInfoBtn(false), 5000);
      });
  });

  return (
    <div>
      <Button
        disabled={disableInfoBtn}
        sx={{ mb: 2 }}
        color="primary"
        variant="contained"
        onClick={() => {
          getDeepDives();
          setDisableInfoBtn(true);
        }}
      >
        get deep dive info
      </Button>
      <div>
        {apiData?.variants.map((deepDive, index) => (
          <div key={index}>
            <Box
              sx={{
                mb: 0.5,
                display: 'flex',
                flexDirection: 'column',
                fontWeight: 'bold',
              }}
            >
              <span>Name: {deepDive.name}</span>
              <span>Biome: {deepDive.biome}</span>
            </Box>
            <TableContainer
              sx={{ maxWidth: 800, mb: 4 }}
              component={Paper}
              elevation={0}
              variant="outlined"
            >
              <Table aria-label="ddtable">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 180 }}>
                      <h2>{deepDive.type}</h2>
                    </TableCell>
                    <TableCell>
                      <h3>Primary</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Secondary</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Warning</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Anomaly</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deepDive.stages.map((stage, stageIndex) => (
                    <TableRow key={stageIndex}>
                      <TableCell align="left" component="th" scope="row">
                        {stage.id}
                      </TableCell>
                      <TableCell>{stage.primary}</TableCell>
                      <TableCell>{stage.secondary}</TableCell>
                      <TableCell>{stage.warning}</TableCell>
                      <TableCell>{stage.anomaly}</TableCell>
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
