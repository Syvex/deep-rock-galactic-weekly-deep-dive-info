import React from 'react';

const FetchError = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p>
        <b>Something went wrong while fetching the data.</b>
      </p>
      <p>Either traffic is high or the API is currently unavailable.</p>
      <p>
        <b>Just press the button once more to try again.</b>
      </p>
      <p>
        Alternatively you can{' '}
        <a target="_blank" href="https://drgapi.com/v1/deepdives">
          click here
        </a>{' '}
        to access the raw data directly.
      </p>
    </div>
  );
};

export default FetchError;
