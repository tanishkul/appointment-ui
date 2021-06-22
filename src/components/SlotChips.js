import React from 'react';
import {
  Button,
} from '@material-ui/core';

const SlotChips = (props) => {
  const { events, time, setTime } = props;
  return (
    <>
      {events.map((item, index) => (
        <Button
          color="primary"
          onClick={() => setTime(item)}
          variant={(time !== item) ? 'text' : 'contained'}
        >
          {item}
        </Button>
      ))}
    </>
  );
}

export default SlotChips;
