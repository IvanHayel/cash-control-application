import {toast}        from 'react-toastify';
import {api}          from '../Config';
import {TRANSFER_API} from '../Constants';
import stores         from '../Stores';

const {transferStore, authenticationStore} = stores;

export const getUserTransfers = async () => {
  const currentUser = authenticationStore.getCurrentUser();
  try {
    const response =
        await api.get(`${TRANSFER_API.USER_TRANSFERS}/${currentUser.id}`);
    transferStore.setTransfers(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createTransfer = async (transfer) => {
  try {
    const response = await toast.promise(
        api.post(`${TRANSFER_API.NEW}`, transfer),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Transfer created successfully!',
          error: 'Error creating transfer!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getUserTransfers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteTransfer = async (id) => {
  try {
    const response = await toast.promise(
        api.delete(`${TRANSFER_API.DELETE}/${id}`),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Transfer deleted successfully!',
          error: 'Error deleting transfer!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        });
    await getUserTransfers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editTransfer = async (id, transfer) => {
  try {
    const response = await toast.promise(
        api.put(`${TRANSFER_API.EDIT}/${id}`, transfer),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Transfer updated successfully!',
          error: 'Error updating transfer!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getUserTransfers();
    return response;
  } catch (error) {
    return error.response;
  }
};
