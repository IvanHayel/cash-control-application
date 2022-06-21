import {toast}      from 'react-toastify';
import {api}        from '../Config';
import {INCOME_API} from '../Constants';
import stores       from '../Stores';

const {incomeStore, authenticationStore} = stores;

export const getUserIncomes = async () => {
  const currentUser = authenticationStore.getCurrentUser();
  try {
    const response =
        await api.get(`${INCOME_API.USER_INCOMES}/${currentUser.id}`);
    incomeStore.setIncomes(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createIncome = async (income) => {
  try {
    const response = await toast.promise(
        api.post(`${INCOME_API.NEW}`, income),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Income created successfully!',
          error: 'Error creating income!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getUserIncomes();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteIncome = async (id) => {
  try {
    const response = await toast.promise(
        api.delete(`${INCOME_API.DELETE}/${id}`),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Income deleted successfully!',
          error: 'Error deleting income!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        });
    await getUserIncomes();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editIncome = async (id, income) => {
  try {
    const response = await toast.promise(
        api.put(`${INCOME_API.EDIT}/${id}`, income),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Income updated successfully!',
          error: 'Error updating income!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getUserIncomes();
    return response;
  } catch (error) {
    return error.response;
  }
};
