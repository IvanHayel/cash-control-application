import {Container, Grid, Typography} from '@mui/material';
import {
  observer,
}                                    from 'mobx-react-lite';
import React, {
  useEffect,
}                                    from 'react';
import {
  useStores,
}                                    from '../../Hooks';
import {
  getUserExpenses,
  getUserIncomes,
  getUserTransfers,
  getUserWallets,
}                                    from '../../Services';
import './Styles/Profile.scss';

export const Profile = observer(() => {
  const {
    walletStore,
    authenticationStore,
    expenseStore,
    incomeStore,
    transferStore,
  } = useStores();
  const currentUser = authenticationStore.getCurrentUser();
  useEffect(() => {
    const fetchData = async () => {
      await getUserWallets();
      await getUserIncomes();
      await getUserExpenses();
      await getUserTransfers();
    };
    fetchData().catch(console.error);
  }, []);
  return (
      <Container className="profile-container">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" className="profile-title">
              PROFILE
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className="profile-subtitle">
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className="profile-text">
              Username: {currentUser.username}
            </Typography>
            <Typography variant="h6" className="profile-text">
              Email: {currentUser.email}
            </Typography>
            <Typography variant="h6" className="profile-text">
              Roles: {currentUser.roles.map(role => role.substring(5))
            .join(', ')}
            </Typography>
            <Typography variant="h6" className="profile-text">
              Refresh
              token: {authenticationStore.getLocalRefreshToken().refreshToken}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className="profile-subtitle">
              App usage
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className="profile-text">
              Total wallets: {walletStore.getWalletsCount()}
            </Typography>
            <Typography variant="h6" className="profile-text">
              Total incomes: {incomeStore.getIncomesCount()}
            </Typography>
            <Typography variant="h6" className="profile-text">
              Total expenses: {expenseStore.getExpensesCount()}
            </Typography>
            <Typography variant="h6" className="profile-text">
              Total transfers: {transferStore.getTransfersCount()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
  );
});