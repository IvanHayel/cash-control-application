import './Styles/Wallet.scss';
import React                                            from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import walletImg
                                                        from '../../Assets/Images/wallet.jpg';
import {getCurrencySymbol}                              from '../../Services';
import {observer}                                       from 'mobx-react-lite';
import {DeleteWalletDialog}                             from '../Dialogs';
import {EditWalletModal}                                from '../Modals';

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
            <DeleteWalletDialog id={wallet.id} />
            <EditWalletModal wallet={wallet} />
          </CardContent>
        </Card>
      </Grid>
  );
});