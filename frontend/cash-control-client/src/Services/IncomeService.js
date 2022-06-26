import {toast}                                           from 'react-toastify';
import {api}                                             from '../Config';
import {BASIC_TOAST_OPTIONS, INCOME_API, TOAST_MESSAGES} from '../Constants';
import stores                                            from '../Stores';
import {createErrorMessage}                              from '../Utils';

const {incomeStore, authenticationStore} = stores;

export const getUserIncomes = async () => {
  const currentUser = authenticationStore.getCurrentUser();
  try {
    const url = `${INCOME_API.USER_INCOMES}/${currentUser.id}`;
    const response = await api.get(url);
    incomeStore.setIncomes(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createIncome = async (income) => {
  try {
    const url = `${INCOME_API.INCOMES}`;
    const response = await toast.promise(
        api.post(url, income),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.CREATE_INCOME_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserIncomes();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editIncome = async (id, income) => {
  try {
    const url = `${INCOME_API.INCOMES}/${id}`;
    const response = await toast.promise(
        api.put(url, income),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.EDIT_INCOME_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserIncomes();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteIncome = async (id) => {
  try {
    const url = `${INCOME_API.INCOMES}/${id}`;
    const response = await toast.promise(
        api.delete(url),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.DELETE_INCOME_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserIncomes();
    return response;
  } catch (error) {
    return error.response;
  }
};
