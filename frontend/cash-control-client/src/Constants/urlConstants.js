export const API_BASE_URL = 'http://localhost:8080/api';

export const AUTH_API = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  SIGN_OUT: '/auth/sign-out',
  REFRESH_TOKEN: '/auth/refresh-token',
};

export const TEST_API = {
  TEST_PUBLIC: '/test/all',
  TEST_USER: '/test/user',
  TEST_MODERATOR: '/test/moderator',
  TEST_ADMIN: '/test/admin',
  TEST_ROOT: '/test/root',
};

export const USER_API = {
  GET_ALL: '/users',
  DELETE: '/users/delete',
  EDIT: '/users/update',
};
