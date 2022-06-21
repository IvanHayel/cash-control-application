import {configure} from 'mobx';
import RootStore   from './RootStore';

configure({
  enforceActions: 'never',
});

const rootStore = new RootStore();

const stores = {
  rootStore,
  authenticationStore: rootStore.authenticationStore,
  userStore: rootStore.userStore,
  walletStore: rootStore.walletStore,
  incomeStore: rootStore.incomeStore,
  expenseStore: rootStore.expenseStore,
  transferStore: rootStore.transferStore,
};

export default stores;
