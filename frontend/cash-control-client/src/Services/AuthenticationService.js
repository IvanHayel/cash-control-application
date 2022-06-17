import {toast}                 from 'react-toastify';
import {api}                   from '../Config';
import {AUTH_API, HTTP_STATUS} from '../Constants';
import stores                  from '../Stores';

const {authenticationStore, userStore} = stores;

const createErrorMessage = (data) =>
    (data.response && data.response.data && data.response.data.message) ||
    data.message ||
    data.toString();

export const signUp = async (body) => {
  try {
    return await toast.promise(
        api.post(AUTH_API.SIGN_UP, body),
        {
          pending: 'Wait a couple of seconds...',
          success: 'Registration complete!',
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
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
          pending: 'Wait a couple of seconds...',
          success: 'Glad to see you',
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    authenticationStore.authenticate(response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const signOut = async (message) => {
  const successMessage = message || 'See you later!';
  try {
    const body = authenticationStore.getUserId();
    const response = await toast.promise(
        api.post(AUTH_API.SIGN_OUT, body),
        {
          pending: 'Wait a couple of seconds...',
          success: successMessage,
          error: {
            render({data}) {
              return createErrorMessage(data);
            },
          },
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    authenticationStore.clearStore();
    userStore.clearStore();
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
          pending: 'Wait a couple of seconds...',
          success: 'Token refreshed!',
        },
        {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          duration: 10000,
        },
    );
    authenticationStore.refreshTokens(response.data);
    return response;
  } catch (error) {
    if (error.response.status === HTTP_STATUS.FORBIDDEN) {
      await signOut('Your session has expired. Please sign in again.');
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