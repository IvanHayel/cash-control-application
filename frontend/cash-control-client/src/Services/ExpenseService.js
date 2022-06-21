import {toast}       from 'react-toastify';
import {api}         from '../Config';
import {EXPENSE_API} from '../Constants';
import stores        from '../Stores';

const {expenseStore, authenticationStore} = stores;

export const getUserExpenses = async () => {
  const currentUser = authenticationStore.getCurrentUser();
  try {
    const response =
        await api.get(`${EXPENSE_API.USER_EXPENSES}/${currentUser.id}`);
    expenseStore.setExpenses(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createExpense = async (income) => {
  try {
    const response = await toast.promise(
        api.post(`${EXPENSE_API.NEW}`, income),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Expense created successfully!',
          error: 'Error creating expense!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getUserExpenses();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await toast.promise(
        api.delete(`${EXPENSE_API.DELETE}/${id}`),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Expense deleted successfully!',
          error: 'Error deleting expense!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        });
    await getUserExpenses();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editExpense = async (id, expense) => {
  try {
    const response = await toast.promise(
        api.put(`${EXPENSE_API.EDIT}/${id}`, expense),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Expense updated successfully!',
          error: 'Error updating expense!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getUserExpenses();
    return response;
  } catch (error) {
    return error.response;
  }
};
