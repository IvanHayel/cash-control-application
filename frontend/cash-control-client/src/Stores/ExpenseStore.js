import {makeAutoObservable} from 'mobx';

export default class ExpenseStore {
  expenses = [];

  constructor() {
    makeAutoObservable(this);
  }

  setExpenses(expenses) {
    this.expenses = expenses;
  }

  getExpenses() {
    return [...this.expenses];
  }

  clearStore() {
    this.expenses = [];
  }
}