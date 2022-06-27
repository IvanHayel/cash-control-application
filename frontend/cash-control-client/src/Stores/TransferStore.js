import {makeAutoObservable} from "mobx";

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

  getTransfersCount() {
    return this.transfers.length;
  }

  clearStore() {
    this.transfers = [];
  }
}
