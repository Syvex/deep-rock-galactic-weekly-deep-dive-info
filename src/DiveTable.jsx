import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

const DiveTable = ({ diveData }) => {
  return (
    <div>
      {diveData?.variants?.map((deepDive, index) => (
        <div className="table-wrapper" key={index}>
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
            sx={{ maxWidth: 800 }}
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
  );
};

export default DiveTable;
