
import React, { useState } from 'react';
import * as moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  makeStyles,
  Box,
  Typography
} from '@material-ui/core';

import { DateRangePicker } from '../components';
import { appointmentService } from '../services';

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
    justifyContent: 'space-evenly',
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

const ShowEvent = () => {
  const {
    container, formClass, logo, divClass, boxClass,
  } = useStyles();
  const [value, setValue] = useState({ startDate: new Date(), endDate: new Date() });
  const [events, setEvents] = useState(null);

  const handleClick = async () => {
    if (value && value.startDate && value.endDate) {
      let bookedEvents = await appointmentService.getBookedEvent(value.startDate, value.endDate);
      bookedEvents = bookedEvents.map(({ startTime, endTime }) => ({
        startTime: moment(startTime).format('MMMM Do YYYY, h:mm:ss a'),
        endTime: moment(endTime).format('MMMM Do YYYY, h:mm:ss a')
      }))
      setEvents(bookedEvents);
    }
  }

  return (
    <div className={container}>
      <Box border={1} className={boxClass}>
        <form className={formClass}>
          <div className={divClass}>
            <Typography className={logo} component="h1" variant="h4">
              View Appointments
            </Typography>
          </div>
          <div className={divClass}>
            <DateRangePicker setValue={setValue} value={value} />
          </div>
          <div className={divClass}>
            <Button
              color="primary"
              onClick={() => handleClick('getFreeEvent')}
              variant="contained"
            >
              Get Booked Events
            </Button>
          </div>
          <div className={divClass}>
            <Paper className="container">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial No.</TableCell>
                    <TableCell numeric>Start Time</TableCell>
                    <TableCell numeric>End Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(events && events.length) ? events.map(({
                    startTime, endTime
                  }, index) => (
                    <TableRow key={`${index + 1}`}>
                      <TableCell component="th" scope="row">
                        {`${index + 1}`}
                      </TableCell>
                      <TableCell numeric>{startTime}</TableCell>
                      <TableCell numeric>{endTime}</TableCell>
                    </TableRow>
                  )) : 'No records found'}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </form>
      </Box>
    </div>
  )
}

export default ShowEvent;
