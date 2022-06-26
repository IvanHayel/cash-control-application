import {MenuItem}                                        from '@mui/material';
import {toast}                                           from 'react-toastify';
import {api}                                             from '../Config';
import {BASIC_TOAST_OPTIONS, TOAST_MESSAGES, WALLET_API} from '../Constants';
import stores                                            from '../Stores';
import {createErrorMessage}                              from '../Utils';
import {
  getUserExpenses,
}                                                        from './ExpenseService';
import {getUserIncomes}                                  from './IncomeService';
import {
  getUserTransfers,
}                                                        from './TransferService';

const {walletStore, authenticationStore} = stores;

export const getUserWallets = async () => {
  const currentUser = authenticationStore.getCurrentUser();
  try {
    const url = `${WALLET_API.USER_WALLETS}/${currentUser.id}`;
    const response = await api.get(url);
    walletStore.setWallets(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createWallet = async (wallet) => {
  try {
    const url = `${WALLET_API.WALLETS}`;
    const response = await toast.promise(
        api.post(url, wallet),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.CREATE_WALLET_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserWallets();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editWallet = async (id, wallet) => {
  try {
    const url = `${WALLET_API.WALLETS}/${id}`;
    const response = await toast.promise(
        api.put(url, wallet),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.EDIT_WALLET_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserWallets();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteWallet = async (id) => {
  try {
    const url = `${WALLET_API.WALLETS}/${id}`;
    const response = await toast.promise(
        api.delete(url),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.DELETE_WALLET_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserWallets();
    await getUserIncomes();
    await getUserExpenses();
    await getUserTransfers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCurrencySymbol = (alias) => {
  switch (alias.toLowerCase().trim()) {
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    default:
      return '';
  }
};

export const transformWalletToMenuItem = (userWallet) => (
    <MenuItem
        key={userWallet.id}
        value={userWallet.id}
    >
      {userWallet.name} ({userWallet.currency})
    </MenuItem>
);