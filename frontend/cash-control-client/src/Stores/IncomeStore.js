import {makeAutoObservable} from 'mobx';

export default class IncomeStore {
  incomes = [];

  constructor() {
    makeAutoObservable(this);
  }

  setIncomes(incomes) {
    this.incomes = incomes;
  }

  getIncomes() {
    return [...this.incomes];
  }

  clearStore() {
    this.incomes = [];
  }
}