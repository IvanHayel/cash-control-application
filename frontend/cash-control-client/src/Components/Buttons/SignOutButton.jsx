import React         from 'react';
import {observer}    from 'mobx-react';
import {useNavigate} from 'react-router-dom';
import {IconButton}  from '@mui/material';
import LogoutIcon    from '@mui/icons-material/Logout';
import {ROUTE_URL}   from '../../Constants';
import {signOut}     from '../../Services';

export const SignOutButton = observer(() => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTE_URL.HOME);
  };
  return (
      <IconButton
          variant="outlined"
          color="inherit"
          size="medium"
          onClick={handleSignOut}
      >
        <LogoutIcon fontSize="large" />
      </IconButton>
  );
});
