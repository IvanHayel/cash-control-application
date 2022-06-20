package by.hayel.cash.control.server.service;

import by.hayel.cash.control.server.domain.wallet.Expense;
import by.hayel.cash.control.server.domain.wallet.ExpenseType;

import java.util.Collection;

public interface ExpenseService {
  Collection<Expense> getExpensesByWalletId(Long walletId);

  Expense getExpenseById(Long id);

  void deleteById(Long id);

  void save(Expense expense);

  ExpenseType parseExpenseType(String expenseType);
}
