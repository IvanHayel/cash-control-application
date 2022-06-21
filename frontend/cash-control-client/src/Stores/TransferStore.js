import {makeAutoObservable} from 'mobx';

export default class TransferStore {
  transfers = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTransfers(transfers) {
    this.transfers = transfers;
  }

  getTransfers() {
    return [...this.transfers];
  }

  clearStore() {
    this.transfers = [];
  }
}