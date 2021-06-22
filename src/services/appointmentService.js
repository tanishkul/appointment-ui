import axios from 'axios';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';

import config from '../config/config';
import { formatDate } from '../helper/utilities';

const createEvent = async (date, time, duration, timezone) => {
  try {
    const dateStr = formatDate(date);
    const timeStr = moment(time, 'hh:mm A').format('HH:mm');
    const formattedDate = momentTimezone.tz(`${dateStr} ${timeStr}`, timezone).toISOString();
    const durationInt = parseInt(duration, 10);
    const data = await axios({
      method: 'post',
      url: `${config.apiUrl}events/`,
      data: {
        dateTime: formattedDate,
        duration: durationInt
      }
    });
    const event = handleResponse(data);
    return event;
  } catch (error) {
    throw handleResponse(error.response);
  }
}

const getFreeSlots = async (date, timezone) => {
  try {
    const formattedDate = formatDate(date);
    const data = await axios({
      method: 'get',
      url: `${config.apiUrl}events/?date=${formattedDate}&timezone=${timezone}`,
      data: {}
    });
    const event = handleResponse(data);
    return event;
  } catch (error) {
    throw handleResponse(error.response);
  }
}

const getBookedEvent = async (startDate, endDate) => {
  try {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const data = await axios({
      method: 'post',
      url: `${config.apiUrl}events/booked/`,
      data: {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }
    });
    const event = handleResponse(data);
    return event;
  } catch (error) {
    throw handleResponse(error.response);
  }
}

const handleResponse = (response) => {
  try {
    const { data: { data }, status: apiStatus } = response;
    if (!apiStatus === 200) {
      throw data;
    }
    return data;
  } catch (err) {
    throw err;
  }
}


const appointmentService = {
  createEvent,
  getFreeSlots,
  getBookedEvent,
};

export default appointmentService;
