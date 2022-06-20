import './Styles/SideMenu.scss';
import React, {useState} from 'react';
import MenuOpenIcon      from '@mui/icons-material/MenuOpen';
import AddCircleOutlineIcon
                         from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon
                         from '@mui/icons-material/RemoveCircleOutline';
import AccountBalanceWalletOutlinedIcon
                         from '@mui/icons-material/AccountBalanceWalletOutlined';
import CompareArrowsIcon
                         from '@mui/icons-material/CompareArrows';
import EqualizerIcon     from '@mui/icons-material/Equalizer';
import InfoOutlinedIcon  from '@mui/icons-material/InfoOutlined';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
}                        from '@mui/material';
import {observer}        from 'mobx-react-lite';
import MenuIcon          from '@mui/icons-material/Menu';
import {useNavigate}     from 'react-router-dom';
import {ROUTE_URL}       from '../../Constants';

export const SideMenu = observer(() => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => setSideMenuOpen(!isSideMenuOpen);
  const handleWalletsClick = () => {
    navigate(ROUTE_URL.WALLETS);
    setSideMenuOpen(false);
  };
  const handleIncomesClick = () => {
    navigate(ROUTE_URL.INCOMES);
    setSideMenuOpen(false);
  };
  const handleExpensesClick = () => {
    navigate(ROUTE_URL.EXPENSES);
    setSideMenuOpen(false);
  };
  const handleTransfersClick = () => {
    navigate(ROUTE_URL.TRANSFERS);
    setSideMenuOpen(false);
  };
  const handleReportsClick = () => {
    navigate(ROUTE_URL.REPORTS);
    setSideMenuOpen(false);
  };
  const handleAboutClick = () => {
    navigate(ROUTE_URL.ABOUT);
    setSideMenuOpen(false);
  };
  return (
      <Box>
        <IconButton
            className="side-bar-icon-button"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSideMenuOpen(!isSideMenuOpen)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
            anchor="left"
            open={isSideMenuOpen}
            onClose={() => setSideMenuOpen(false)}
        >
          <List className="side-menu">
            <ListItem className="menu-item">
              <ListItemButton onClick={handleBackClick}>
                <ListItemIcon>
                  <MenuOpenIcon fontSize="large" />
                </ListItemIcon>
                <Typography className="head-menu-option">
                  Back
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem className="menu-item">
              <ListItemButton onClick={handleWalletsClick}>
                <ListItemIcon>
                  <AccountBalanceWalletOutlinedIcon fontSize="large"
                                                    color="primary" />
                </ListItemIcon>
                <Typography className="side-menu-option">
                  Wallets
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem className="menu-item incomes">
              <ListItemButton onClick={handleIncomesClick}>
                <ListItemIcon>
                  <AddCircleOutlineIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <Typography className="side-menu-option">
                  Incomes
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem className="menu-item expenses">
              <ListItemButton onClick={handleExpensesClick}>
                <ListItemIcon>
                  <RemoveCircleOutlineIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <Typography className="side-menu-option">
                  Expenses
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem className="menu-item">
              <ListItemButton onClick={handleTransfersClick}>
                <ListItemIcon>
                  <CompareArrowsIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <Typography className="side-menu-option">
                  Transfers
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem className="menu-item">
              <ListItemButton onClick={handleReportsClick}>
                <ListItemIcon>
                  <EqualizerIcon fontSize="large" color="primary" />
                </ListItemIcon>
                <Typography className="side-menu-option">
                  Reports
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
          <List className="side-menu-footer">
            <ListItem className="menu-item" disablePadding>
              <ListItemButton onClick={handleAboutClick}>
                <ListItemIcon>
                  <InfoOutlinedIcon
                      fontSize="large"
                      fontWeight="bold"
                  />
                </ListItemIcon>
                <Typography className="side-menu-option">
                  About
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
  );
});