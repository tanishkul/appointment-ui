/* eslint-disable max-len */
const envVars = process.env;
const config = {
  apiUrl: envVars.REACT_APP_SERVICE_URL || 'https://appointment-svc.herokuapp.com/api/',
};
export default config;
