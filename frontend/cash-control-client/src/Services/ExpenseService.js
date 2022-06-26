import {toast}                                            from 'react-toastify';
import {api}                                              from '../Config';
import {BASIC_TOAST_OPTIONS, EXPENSE_API, TOAST_MESSAGES} from '../Constants';
import stores                                             from '../Stores';
import {createErrorMessage}                               from '../Utils';

const {expenseStore, authenticationStore} = stores;

export const getUserExpenses = async () => {
  const currentUser = authenticationStore.getCurrentUser();
  try {
    const url = `${EXPENSE_API.USER_EXPENSES}/${currentUser.id}`;
    const response = await api.get(url);
    expenseStore.setExpenses(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createExpense = async (income) => {
  try {
    const url = `${EXPENSE_API.EXPENSES}`;
    const response = await toast.promise(
        api.post(url, income),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.CREATE_EXPENSE_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserExpenses();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editExpense = async (id, expense) => {
  try {
    const url = `${EXPENSE_API.EXPENSES}/${id}`;
    const response = await toast.promise(
        api.put(url, expense),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.EDIT_EXPENSE_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserExpenses();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteExpense = async (id) => {
  try {
    const url = `${EXPENSE_API.EXPENSES}/${id}`;
    const response = await toast.promise(
        api.delete(url),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.DELETE_EXPENSE_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS,
    );
    await getUserExpenses();
    return response;
  } catch (error) {
    return error.response;
  }
};
