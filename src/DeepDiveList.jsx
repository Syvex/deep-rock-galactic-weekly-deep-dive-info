import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import DiveTable from './DiveTable';
import FetchError from './FetchError';

const DeepDiveList = ({ corsProxies }) => {
  const [apiData, setApiData] = React.useState();
  const [disableInfoBtn, setDisableInfoBtn] = React.useState(false);
  const [showFetchErrorInfo, setShowFetchErrorInfo] = React.useState(false);
  let i = 0;

  const getDeepDives = React.useCallback(() => {
    // going through a list of different cors proxy services until
    // it either succeeds or there are no more entries in the list
    const fetchUrl = corsProxies[i] + 'https://drgapi.com/v1/deepdives';
    setShowFetchErrorInfo(false);
    setDisableInfoBtn(true);

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        // 5s delay once data has been loaded before button is usable again to prevent spam
        setTimeout(() => setDisableInfoBtn(false), 5000);
      })
      .catch((error) => {
        console.log(error, i);
        i += 1;
        if (i < corsProxies.length) {
          getDeepDives();
        } else {
          setShowFetchErrorInfo(true);
          setTimeout(() => setDisableInfoBtn(false), 5000);
        }
      });
  });

  const getDeepDivesWithUserInput = React.useCallback((userCorsProxy) => {
    const fetchUrl =
      userCorsProxy?.toString() + 'https://drgapi.com/v1/deepdives';
    setShowFetchErrorInfo(false);
    setDisableInfoBtn(true);

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setTimeout(() => setDisableInfoBtn(false), 5000);
      })
      .catch((error) => {
        console.log(error);
        setShowFetchErrorInfo(true);
        setTimeout(() => setDisableInfoBtn(false), 5000);
      });
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button
        disabled={disableInfoBtn}
        sx={{ mb: 2 }}
        color="primary"
        variant="contained"
        onClick={() => getDeepDives()}
      >
        get deep dive info
      </Button>
      {(showFetchErrorInfo && (
        <FetchError getDeepDivesWithUserInput={getDeepDivesWithUserInput} />
      )) || <DiveTable diveData={apiData} />}
    </div>
  );
};

export default DeepDiveList;
