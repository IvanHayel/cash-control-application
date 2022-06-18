import {api}      from '../Config';
import stores     from '../Stores';
import {USER_API} from '../Constants';
import {toast}    from 'react-toastify';

const {userStore} = stores;

export const getAllUsers = async () => {
  try {
    const response = await api.get(USER_API.GET_ALL);
    userStore.setUsers(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await toast.promise(
        api.delete(`${USER_API.DELETE}/${id}`),
        {
          pending: 'Wait a couple of seconds...',
          success: 'User deleted successfully!',
          error: 'Error deleting user!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editUser = async (id, user) => {
  try {
    const response = await toast.promise(
        api.put(`${USER_API.EDIT}/${id}`, user),
        {
          pending: 'Wait a couple of seconds...',
          success: 'User updated successfully!',
          error: 'Error updating user!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const parseRoles = (roles) => {
  return [...roles.split(',').map(role => role.trim().toLowerCase())];
};