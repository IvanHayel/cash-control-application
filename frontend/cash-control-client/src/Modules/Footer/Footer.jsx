import './Styles/Footer.scss';
import React       from 'react';
import {Copyright} from '../../Components';
import {Box}       from '@mui/material';

export const Footer = () => (
    <Box className="footer">
      <Copyright />
    </Box>
);
