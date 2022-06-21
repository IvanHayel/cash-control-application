import AuthenticationStore from './AuthenticationStore';
import ExpenseStore        from './ExpenseStore';
import IncomeStore         from './IncomeStore';
import TransferStore       from './TransferStore';
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
    this.incomeStore = new IncomeStore(this);
    this.expenseStore = new ExpenseStore(this);
    this.transferStore = new TransferStore(this);
  }

  clearStores() {
    this.authenticationStore.clearStore();
    this.userStore.clearStore();
    this.walletStore.clearStore();
    this.expenseStore.clearStore();
    this.transferStore.clearStore();
  }
}
