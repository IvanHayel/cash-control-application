import {Container, Divider, Typography} from '@mui/material';
import React                            from 'react';
import './Styles/About.scss';

export const About = () => (
    <Container className="about-container">
      <Typography className="about-title" variant="h3">
        ABOUT
      </Typography>
      <Divider variant="middle" />
      <Typography className="about-text" variant="h5">
        <strong>Cash Control</strong> is a web application that allows you to
        track your cash flow. It is a simple way to keep track of your
        cash flow and to make sure you are not spending more than you have.
      </Typography>
      <Divider variant="middle" />
    </Container>
);