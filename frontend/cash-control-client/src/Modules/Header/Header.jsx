import './Styles/Header.scss';
import React, {useState}      from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
}                             from '@mui/material';
import {
  observer,
}                             from 'mobx-react';
import {
  useNavigate,
}                             from 'react-router-dom';
import {
  ADMIN,
  HOME,
  PROFILE,
}                             from '../../Constants';
import {
  SideMenu,
  SignOutButton,
}                             from '../../Components/';
import {
  isAdmin,
  isAuthenticated,
  isRoot,
  testAll,
}                             from '../../Services';
import {
  SignInModal,
  SignUpModal,
}                             from '../../Modals';
import MenuIcon               from '@mui/icons-material/Menu';
import AccountCircleIcon      from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const Header = observer(() => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isCurrentUserAuthenticated = isAuthenticated();
  const isCurrentUserAdmin = isCurrentUserAuthenticated && isAdmin();
  const isCurrentUserRoot = isCurrentUserAuthenticated && isRoot();

  const handleBrandClick = () => navigate(HOME);
  const handleAdminBoardClick = () => navigate(ADMIN);
  const handleProfileClick = () => navigate(PROFILE);
  const handleTest = async () => {
    await testAll();
  };
  return (
      <AppBar position="sticky" className="header-bar">
        <Toolbar>
          {
              isCurrentUserAuthenticated &&
              <>
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
                <SideMenu
                    open={isSideMenuOpen}
                    onClose={() => setSideMenuOpen(false)}
                />
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
          <Button
              variant="outlined"
              color="inherit"
              sx={{ml: '20px'}}
              onClick={handleTest}
          >
            TEST
          </Button>
        </Toolbar>
      </AppBar>
  );
});