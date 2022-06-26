import {toast}                                             from 'react-toastify';
import {api}                                               from '../Config';
import {BASIC_TOAST_OPTIONS, TOAST_MESSAGES, TRANSFER_API} from '../Constants';
import stores                                              from '../Stores';
import {createErrorMessage}                                from '../Utils';

const {transferStore, authenticationStore} = stores;

export const getUserTransfers = async () => {
  const currentUser = authenticationStore.getCurrentUser();
  try {
    const url = `${TRANSFER_API.USER_TRANSFERS}/${currentUser.id}`;
    const response = await api.get(url);
    transferStore.setTransfers(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createTransfer = async (transfer) => {
  try {
    const url = `${TRANSFER_API.TRANSFERS}`;
    const response = await toast.promise(
        api.post(url, transfer),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.CREATE_TRANSFER_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserTransfers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editTransfer = async (id, transfer) => {
  try {
    const url = `${TRANSFER_API.TRANSFERS}/${id}`;
    const response = await toast.promise(
        api.put(url, transfer),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.EDIT_TRANSFER_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserTransfers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteTransfer = async (id) => {
  try {
    const url = `${TRANSFER_API.TRANSFERS}/${id}`;
    const response = await toast.promise(
        api.delete(url),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.DELETE_TRANSFER_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserTransfers();
    return response;
  } catch (error) {
    return error.response;
  }
};
