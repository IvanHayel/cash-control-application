import AddCircleOutlineOutlinedIcon
                             from '@mui/icons-material/AddCircleOutlineOutlined';
import {Container, Grid}     from '@mui/material';
import {observer}            from 'mobx-react-lite';
import React, {useEffect}    from 'react';
import {Wallet, WalletModal} from '../../Components';
import {useStore}            from '../../Hooks';
import {getUserWallets}      from '../../Services';
import './Styles/Wallets.scss';

export const Wallets = observer(() => {
  const walletStore = useStore('walletStore');
  const userWallets = walletStore.getWallets();
  useEffect(() => {
    const fetchData = async () => {
      await getUserWallets();
    };
    fetchData().catch((error) => console.error(error));
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
            userWallets.reverse().map((wallet) => (
                <Wallet key={wallet.id} wallet={wallet} />
            ))
          }
          <Grid item xs={10} md={3}>
            <WalletModal
                action="create"
                buttonClassName="add-wallet-button"
                buttonIcon={<AddCircleOutlineOutlinedIcon fontSize="large" />}
            />
          </Grid>
        </Grid>
      </Container>
  );
});