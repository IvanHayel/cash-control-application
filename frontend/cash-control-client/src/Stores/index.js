import RootStore   from './RootStore';
import {configure} from 'mobx';

configure({
  enforceActions: 'never',
});

const rootStore = new RootStore();

const stores = {
  rootStore,
  authenticationStore: rootStore.authenticationStore,
  userStore: rootStore.userStore,
  walletStore: rootStore.walletStore,
};

export default stores;
