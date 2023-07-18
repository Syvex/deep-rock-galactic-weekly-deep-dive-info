import React from 'react';
import { TextField, Button } from '@mui/material';

const FetchError = ({ getDeepDivesWithUserInput }) => {
  const [userInput, setUserInput] = React.useState('');

  const handleSumbit = () => {
    getDeepDivesWithUserInput(userInput);
  };

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
      <p>
        Either the cors proxy service is broken or the API is currently
        unavailable.
      </p>
      <p>
        <b>Just press the button once more to try again.</b>
      </p>
      <p>
        Alternatively you can provide a cors proxy service url of your choice
        and try again with that.
      </p>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={handleSumbit}
      >
        <TextField
          sx={{ mb: 2, width: 400 }}
          required
          value={userInput}
          onInput={(e) => setUserInput(e.target.value)}
        />
        <Button color="primary" variant="outlined" type="submit">
          Try with new proxy
        </Button>
      </form>
    </div>
  );
};

export default FetchError;
