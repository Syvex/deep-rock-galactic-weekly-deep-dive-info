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
    const proxy = 'https://corsproxy.io/?';
    const apiUrl = encodeURIComponent('https://drgapi.com/v1/deepdives');
    const fetchUrl = proxy + apiUrl;
    setShowFetchErrorInfo(false);
    setDisableInfoBtn(true);

    await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
        sx={{ mb: 4 }}
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
