import AuthenticationStore from './AuthenticationStore';
import UserStore           from './UserStore';
import WalletStore         from './WalletStore';

export const createErrorMessage = (data) =>
    (data.response && data.response.data && data.response.data.message) ||
    data.message ||
    data.toString();

export default class RootStore {
  constructor() {
    this.authenticationStore = new AuthenticationStore(this);
    this.userStore = new UserStore(this);
    this.walletStore = new WalletStore(this);
  }
}
