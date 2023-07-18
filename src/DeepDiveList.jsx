import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import DiveTable from './DiveTable';
import FetchError from './FetchError';

const DeepDiveList = ({ corsProxies }) => {
  const [apiData, setApiData] = React.useState();
  const [disableInfoBtn, setDisableInfoBtn] = React.useState(false);
  const [userCorsProxy, setUserCorsProxy] = React.useState();
  const [showFetchErrorInfo, setShowFetchErrorInfo] = React.useState(false);
  let i = 0;

  // going through a list of different cors proxy services until
  // it either succeeds or there are no more entries in the list
  const getDeepDives = React.useCallback(() => {
    const fetchUrl = `${
      userCorsProxy?.toString() || corsProxies[i]
    }https://drgapi.com/v1/deepdives`;
    setShowFetchErrorInfo(false);

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
        if (!userCorsProxy && i < corsProxies.length) {
          getDeepDives();
        } else {
          setShowFetchErrorInfo(true);
          setTimeout(() => setDisableInfoBtn(false), 5000);
        }
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
        onClick={() => {
          getDeepDives();
          setDisableInfoBtn(true);
        }}
      >
        get deep dive info
      </Button>
      {(showFetchErrorInfo && (
        <FetchError
          getDeepDives={getDeepDives}
          setUserCorsProxy={setUserCorsProxy}
        />
      )) || <DiveTable diveData={apiData} />}
    </div>
  );
};

export default DeepDiveList;
