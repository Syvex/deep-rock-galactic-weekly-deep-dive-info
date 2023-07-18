import React from 'react';
import './style.css';
import { Button } from '@mui/material';
import DiveTable from './DiveTable';
import FetchError from './FetchError';

const DeepDiveList = () => {
  const [apiData, setApiData] = React.useState();
  const [disableInfoBtn, setDisableInfoBtn] = React.useState(false);
  const [showFetchErrorInfo, setShowFetchErrorInfo] = React.useState(false);

  const getDeepDives = async () => {
    // going through a list of different cors proxy services until
    // it either succeeds or there are no more entries in the list
    const fetchUrl = 'https://drgapi.com/v1/deepdives';
    setShowFetchErrorInfo(false);
    setDisableInfoBtn(true);

    await fetch(fetchUrl, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        response.text();
        console.log(response);
      })
      .then((data) => {
        console.log(data.json());
        setApiData(data);
        // 5s delay once data has been loaded before button is usable again to prevent spam
        setTimeout(() => setDisableInfoBtn(false), 5000);
      })
      .catch((error) => {
        console.log(error);
        setShowFetchErrorInfo(true);
        setTimeout(() => setDisableInfoBtn(false), 5000);
      });
  };

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
      {(showFetchErrorInfo && <FetchError />) || (
        <DiveTable diveData={apiData} />
      )}
    </div>
  );
};

export default DeepDiveList;
