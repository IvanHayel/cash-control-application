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

  getExpensesCount() {
    return this.expenses.length;
  }

  getExpensesReport() {
    if (!this.expenses.length) return [];
    return this.expenses.reduce((acc, expense) => {
      const {type, amount, walletTransportId} = expense;
      if (!acc.length) acc = [
        {
          type,
          walletTransportId,
          [walletTransportId]: amount,
        }];
      else {
        if (acc.filter(item => item.type === type && item.walletTransportId ===
            walletTransportId).length) {
          acc.forEach(item => {
            if (item.type === type && item.walletTransportId ===
                walletTransportId) {
              item[walletTransportId] += amount;
            }
          });
        } else {
          acc.push({
            type,
            walletTransportId,
            [walletTransportId]: amount,
          });
        }
      }
      return acc;
    }, []);
  }

  clearStore() {
    this.expenses = [];
  }
}