import './Styles/Header.scss';
import React                  from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
}                             from '@mui/material';
import {observer}             from 'mobx-react';
import {
  useNavigate,
}                             from 'react-router-dom';
import {
  ROUTE_URL,
}                             from '../../Constants';
import {
  SideMenu,
  SignInModal,
  SignOutButton,
  SignUpModal,
}                             from '../../Components/';
import {
  isAdmin,
  isAuthenticated,
  isRoot,
}                             from '../../Services';
import AccountCircleIcon      from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const Header = observer(() => {
  const navigate = useNavigate();

  const isCurrentUserAuthenticated = isAuthenticated();
  const isCurrentUserAdmin = isCurrentUserAuthenticated && isAdmin();
  const isCurrentUserRoot = isCurrentUserAuthenticated && isRoot();

  const handleBrandClick = () => navigate(ROUTE_URL.HOME);
  const handleAdminBoardClick = () => navigate(ROUTE_URL.ADMIN.BOARD);
  const handleProfileClick = () => navigate(ROUTE_URL.PROFILE);
  return (
      <AppBar position="sticky" className="header-bar">
        <Toolbar>
          {
              isCurrentUserAuthenticated &&
              <>
                <SideMenu />
              </>
          }
          <Typography variant="h5"
                      noWrap
                      onClick={handleBrandClick}
                      className="brand"
          >
            CASH CONTROL
          </Typography>
          <Box className="main-buttons">
            {
                (isCurrentUserAdmin || isCurrentUserRoot) &&
                <IconButton
                    color="inherit"
                    size="medium"
                    onClick={handleAdminBoardClick}
                >
                  <AdminPanelSettingsIcon fontSize="large" />
                </IconButton>
            }
          </Box>
          <Box className="sign-group">
            {
              isCurrentUserAuthenticated ?
                  <>
                    <IconButton
                        color="inherit"
                        size="medium"
                        onClick={handleProfileClick}
                    >
                      <AccountCircleIcon fontSize="large" />
                    </IconButton>
                    <SignOutButton />
                  </>
                  :
                  <>
                    <SignInModal />
                    <SignUpModal />
                  </>
            }
          </Box>
        </Toolbar>
      </AppBar>
  );
});