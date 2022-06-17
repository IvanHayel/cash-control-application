import React          from 'react';
import {Drawer, List} from '@mui/material';

export const SideMenu = (props) => (
    <Drawer
        anchor="left"
        {...props}
    >
      <List sx={{width: 250}}>
        {/*  todo: SIDE MENU THERE */}
      </List>
    </Drawer>
);