import {makeAutoObservable} from 'mobx';

export default class WalletStore {
  wallets = [];

  constructor() {
    makeAutoObservable(this);
  }

  setWallets(wallets) {
    this.wallets = wallets;
  }

  getWallets() {
    return [...this.wallets];
  }

  clearStore() {
    this.wallets = [];
  }
}