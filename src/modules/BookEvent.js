import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {
  Button,
  TextField,
  makeStyles,
  Typography,
  MenuItem,
  Select,
  Box,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Timezones } from '../helper/constants';
import { appointmentService } from '../services';
import { SlotsChips } from '../components';

const useStyles = makeStyles(() => ({
  container: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
  divClass: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '50px',
    marginBottom: '50px'
  },
  formClass: {
    textAlign: 'center',
    marginLeft: '350px',
    marginRight: '350px',
  },
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    color: 'black',
    textAlign: 'left',
  },
  boxClass: {
    margin: '150px',
  }
}));

const BookEvent = () => {
  const {
    container, formClass, logo, divClass, boxClass,
  } = useStyles();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [timezone, setTimezone] = useState(`${Timezones[0]}`);
  const [duration, setDuration] = useState('');
  const [freeSlots, setFreeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);

  const minDate = new Date(new Date().getTime());
  const handleChange = (event, key) => {
    if (key === 'duration' && event.target.value > 0) {
      setDuration(event.target.value);
      setFreeSlots([]);
      setSelectedTime(null);
    } else if (key === 'timezone') {
      setTimezone(event.target.value);
      setFreeSlots([]);
      setSelectedTime(null);
    } else if (key === 'date') {
      setDate(event);
      setFreeSlots([]);
      setSelectedTime(null);
    }
  };

  const handleClick = async (key) => {
    if (key === 'getFreeEvent') {
      const events = await appointmentService.getFreeSlots(date, timezone);
      setFreeSlots(events);
    } else {
      await appointmentService.createEvent(date, selectedTime, duration, timezone);
      setSuccessAlert(true);
      setDate(new Date());
      setTimezone(`${Timezones[0]}`);
      setDuration('');
      setFreeSlots([]);
      setSelectedTime(null);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={() => setSuccessAlert(false)}
        open={successAlert}
      >
        <Alert elevation={6} onClose={() => setSuccessAlert(false)} severity="success" variant="filled">
          Appointment booked!
        </Alert>
      </Snackbar>
      <div className={container}>
        <Box border={1} className={boxClass}>
          <form className={formClass}>
            <div className={divClass}>
              <Typography className={logo} component="h1" variant="h6">
                Choose date of event:
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  disablePast
                  format="dd/MM/yyyy"
                  minDate={minDate}
                  onChange={e => handleChange(e, 'date')}
                  value={date}
                  variant="inline"
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={divClass}>
              <Typography className={logo} component="h1" variant="h6">
                Duration:
              </Typography>
              <TextField
                id="standard-basic"
                onChange={e => handleChange(e, 'duration')}
                placeholder="in minutes"
                type="number"
                value={duration}
              />
              <Typography className={logo} component="h1" variant="h6">
                Timezone:
              </Typography>
              <Select
                id="demo-controlled-open-select"
                labelId="demo-controlled-open-select-label"
                onChange={e => handleChange(e, 'timezone')}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                value={timezone}
              >
                {Timezones.map(item => (<MenuItem value={item}>{item}</MenuItem>))}
              </Select>
            </div>
            <SlotsChips events={freeSlots} setTime={setSelectedTime} time={selectedTime} />
            <div className={divClass}>
              <Button
                color="primary"
                onClick={() => handleClick('getFreeEvent')}
                variant="contained"
              >
                Get Free Time
              </Button>
              <Button
                color="primary"
                disabled={!(duration && selectedTime)}
                onClick={() => handleClick('createEvent')}
                variant="contained"
              >
                Book Appointment
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </>
  );
}

export default BookEvent;
