export const API_BASE_URL = 'http://127.0.0.1:8080/api';

export const AUTH_API = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  SIGN_OUT: '/auth/sign-out',
  REFRESH_TOKEN: '/auth/refresh-token',
};

export const USER_API = {
  USERS: '/users',
  DELETE: '/users/delete',
  EDIT: '/users/update',
};

export const WALLET_API = {
  USER_WALLETS: '/wallets/user',
  NEW: '/wallets/new',
  DELETE: '/wallets/delete',
  EDIT: '/wallets/update',
};

export const INCOME_API = {
  USER_INCOMES: '/incomes/user',
  NEW: '/incomes/new',
  DELETE: '/incomes/delete',
  EDIT: '/incomes/update',
};

export const EXPENSE_API = {
  USER_EXPENSES: '/expenses/user',
  NEW: '/expenses/new',
  DELETE: '/expenses/delete',
  EDIT: '/expenses/update',
}

export const TRANSFER_API = {
  USER_TRANSFERS: '/transfers/user',
  NEW: '/transfers/new',
  DELETE: '/transfers/delete',
  EDIT: '/transfers/update',
}
