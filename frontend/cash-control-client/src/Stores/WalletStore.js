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

  getWalletById(id) {
    return this.wallets.find(wallet => wallet.id === id);
  }

  clearStore() {
    this.wallets = [];
  }
}