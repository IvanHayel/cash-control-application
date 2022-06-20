import './Styles/Wallets.scss';
import React, {useEffect}          from 'react';
import {observer}                  from 'mobx-react-lite';
import {Container, Grid}           from '@mui/material';
import {CreateWalletModal, Wallet} from '../../Components';
import {getUserWallets}            from '../../Services';
import {useStore}                  from '../../Hooks';

export const Wallets = observer(() => {
  const walletStore = useStore('walletStore');
  const userWallets = walletStore.getWallets();
  useEffect(() => {
    getUserWallets();
  }, []);
  return (
      <Container className="wallets-container">
        <Grid
            className="wallets"
            container
            spacing={2}
            padding={1}
            marginY={1}
        >
          {
            userWallets.map((wallet) => (
                <Wallet key={wallet.id} wallet={wallet} />
            ))
          }
          <Grid item xs={10} md={3}>
            <CreateWalletModal />
          </Grid>
        </Grid>
      </Container>
  );
});