import React from 'react';
import './style.css';
import DeepDiveList from './DeepDiveList';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#357a38',
      main: '#4caf50',
      dark: '#6fbf73',
      contrastText: 'rgb(226, 223, 219)',
    },
  },
});

const App = () => {
  return (
    <div className="content-wrapper">
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <h1 className="text-contrast">ROCK AND STONE</h1>
          <DeepDiveList />
        </ThemeProvider>
      </React.StrictMode>
    </div>
  );
};

export default App;
