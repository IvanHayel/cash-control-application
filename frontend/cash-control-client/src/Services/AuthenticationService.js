import {toast} from "react-toastify";
import {
  api
}              from "../Config";
import {
  AUTH_API,
  BASIC_TOAST_OPTIONS,
  HTTP_STATUS,
  TOAST_MESSAGES,
}              from "../Constants";
import stores  from "../Stores";
import {
  createErrorMessage
}              from "../Utils";

const {authenticationStore, rootStore} = stores;

export const signUp = async (body) => {
  try {
    return await toast.promise(
        api.post(AUTH_API.SIGN_UP, body),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.SIGN_UP_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
  } catch (error) {
    return error.response;
  }
};

export const signIn = async (body) => {
  try {
    const response = await toast.promise(
        api.post(AUTH_API.SIGN_IN, body),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.SIGN_IN_SUCCESS,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    authenticationStore.authenticate(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const signOut = async (message) => {
  const successMessage = message || TOAST_MESSAGES.SIGN_OUT_SUCCESS;
  try {
    const body = authenticationStore.getUserId();
    const response = await toast.promise(
        api.post(AUTH_API.SIGN_OUT, body),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: successMessage,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        BASIC_TOAST_OPTIONS
    );
    rootStore.clearStores();
    return response;
  } catch (error) {
    return error.response;
  }
};

export const refreshToken = async () => {
  try {
    const body = authenticationStore.getLocalRefreshToken();
    const response = await toast.promise(
        api.post(AUTH_API.REFRESH_TOKEN, body),
        {
          pending: TOAST_MESSAGES.PENDING,
          success: TOAST_MESSAGES.TOKEN_REFRESH_SUCCESS,
        },
        BASIC_TOAST_OPTIONS
    );
    authenticationStore.refreshTokens(response.data);
    return response;
  } catch (error) {
    if (error.response.status === HTTP_STATUS.FORBIDDEN) {
      await signOut(TOAST_MESSAGES.SESSION_EXPIRED);
    }
    return error.response;
  }
};

export const getLocalAccessToken = () => {
  return authenticationStore.getLocalAccessToken();
};

export const isAuthenticated = () => {
  return authenticationStore.isAuthenticated();
};

export const isModerator = () => {
  return authenticationStore.isModerator();
};

export const isAdmin = () => {
  return authenticationStore.isAdmin();
};

export const isRoot = () => {
  return authenticationStore.isRoot();
};
