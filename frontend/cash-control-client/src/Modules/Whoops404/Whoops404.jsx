import './Styles/Whoops404.scss';
import React                       from 'react';
import {Alert, AlertTitle, Button} from '@mui/material';
import {ROUTE_URL}                 from '../../Constants';
import {useNavigate}               from 'react-router-dom';

export const Whoops404 = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate(ROUTE_URL.HOME);
  };
  return (
      <Alert
          severity="info"
          action={
            <Button color="inherit" variant="outlined" onClick={handleHome}>
              GO HOME
            </Button>
          }
          className="alert"
      >
        <AlertTitle><strong>We are sorry,</strong></AlertTitle>
        the page you were looking for can't be found
      </Alert>
  );
};
