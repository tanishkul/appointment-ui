import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { RoutesData } from '../RoutesData';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#400CCC',
    paddingRight: '79px',
    paddingLeft: '118px',
  },
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'left',
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

const Navigation = () => {
  const {
    header,
    logo,
    menuButton,
    toolbar,
  } = useStyles();

  const websiteLogo = (
    <Typography className={logo} component="h1" variant="h6">
      Appointment Booking App
    </Typography>
  );

  const getMenuButtons = () => RoutesData.map(({ label, href }) => (
    <Button
      {...{
        key: label,
        color: 'inherit',
        to: href,
        component: RouterLink,
        className: menuButton
      }}
    >
      {label}
    </Button>
  ));

  const displayDesktop = () => (
    <Toolbar className={toolbar}>
      {websiteLogo}
      <div>{getMenuButtons()}</div>
    </Toolbar>
  );

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}

export default Navigation;
