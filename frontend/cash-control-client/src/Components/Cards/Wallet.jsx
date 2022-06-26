import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {observer}                                       from 'mobx-react-lite';
import React                                            from 'react';
import walletImg
                                         from '../../Assets/Images/wallet.jpg';
import {deleteWallet, getCurrencySymbol} from '../../Services';
import {DeleteDialog}                    from '../Dialogs';
import {EditWalletModal}                                from '../Modals';
import './Styles/Wallet.scss';

export const Wallet = observer((props) => {
  const {wallet} = props;
  return (
      <Grid item xs={10} md={3}>
        <Card className="wallet">
          <CardMedia
              className="wallet-image"
              image={walletImg}
              alt={wallet.name}
          />
          <CardContent>
            <Typography
                className="wallet-name"
                variant="h4"
            >
              {wallet.name}
            </Typography>
            <Typography
                className="wallet-info"
                variant="h6"
            >
              <strong>Balance:</strong>
              <div className={wallet.balance >= 0 ?
                  'positive-balance' :
                  'negative-balance'}>
                {`${wallet.balance} ${getCurrencySymbol(wallet.currency)}`}
              </div>
            </Typography>
            <Typography variant="caption" fontSize="small" fontWeight="bold">
              <i>{`Created: ${new Date(wallet.created).toLocaleString()}`}</i>
            </Typography>
            <br />
            <Typography variant="caption" fontSize="small" fontWeight="bold">
              <i>{`Modified: ${new Date(wallet.modified).toLocaleString()}`}</i>
            </Typography>
            <DeleteDialog
                itemToDelete="wallet"
                onConfirmDelete={() => deleteWallet(wallet.id)}
                buttonClassName="remove-button"
                buttonSize="large"
            />
            <EditWalletModal wallet={wallet} />
          </CardContent>
        </Card>
      </Grid>
  );
});