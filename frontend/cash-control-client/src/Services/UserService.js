import {toast}                                         from "react-toastify";
import {api}                                           from "../Config";
import {BASIC_TOAST_OPTIONS, TOAST_MESSAGES, USER_API} from "../Constants";
import stores                                          from "../Stores";
import {createErrorMessage}                            from "../Utils";

const {userStore} = stores;

export const getAllUsers = async () => {
  try {
    const response = await api.get(USER_API.USERS);
    userStore.setUsers(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editUser = async (id, user) => {
  try {
    const url = `${USER_API.USERS}/${id}`;
    const response = await toast.promise(
        api.put(url, user),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.EDIT_USER_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteUser = async (id) => {
  try {
    const url = `${USER_API.USERS}/${id}`;
    const response = await toast.promise(
        api.delete(url),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.DELETE_USER_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    await getAllUsers();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const parseRoles = (roles) => {
  return [...roles.split(",").map((role) => role.trim().toLowerCase())];
};
