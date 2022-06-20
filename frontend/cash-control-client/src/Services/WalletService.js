import stores       from '../Stores';
import {api}        from '../Config';
import {WALLET_API} from '../Constants';
import {toast}      from 'react-toastify';

const {walletStore, authenticationStore} = stores;

export const getUserWallets = async () => {
  const currentUser = authenticationStore.getCurrentUser();
  try {
    const response =
        await api.get(`${WALLET_API.USER_WALLETS}/${currentUser.id}`);
    walletStore.setWallets(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createWallet = async (wallet) => {
  try {
    const response = await toast.promise(
        api.post(`${WALLET_API.NEW}`, wallet),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Wallet created successfully!',
          error: 'Error creating wallet!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getUserWallets();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteWallet = async (id) => {
  try {
    const response = await toast.promise(
        api.delete(`${WALLET_API.DELETE}/${id}`),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Wallet deleted successfully!',
          error: 'Error deleting wallet!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        });
    await getUserWallets();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editWallet = async (id, wallet) => {
  try {
    const response = await toast.promise(
        api.put(`${WALLET_API.EDIT}/${id}`, wallet),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Wallet updated successfully!',
          error: 'Error updating wallet!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getUserWallets();
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