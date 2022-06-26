export const API_BASE_URL = 'http://127.0.0.1:8080/api';

export const AUTH_API = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  SIGN_OUT: '/auth/sign-out',
  REFRESH_TOKEN: '/auth/refresh-token',
};

export const USER_API = {
  USERS: '/users',
};

export const WALLET_API = {
  USER_WALLETS: '/wallets/user',
  WALLETS: '/wallets',
};

export const INCOME_API = {
  USER_INCOMES: '/incomes/user',
  INCOMES: '/incomes',
};

export const EXPENSE_API = {
  USER_EXPENSES: '/expenses/user',
  EXPENSES: '/expenses',
};

export const TRANSFER_API = {
  USER_TRANSFERS: '/transfers/user',
  TRANSFERS: '/transfers',
};
