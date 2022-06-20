package by.hayel.cash.control.server.service.impl;

import by.hayel.cash.control.server.domain.wallet.Expense;
import by.hayel.cash.control.server.domain.wallet.ExpenseType;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import by.hayel.cash.control.server.exception.ExpenseNotFoundException;
import by.hayel.cash.control.server.repository.ExpenseRepository;
import by.hayel.cash.control.server.service.ExpenseService;
import by.hayel.cash.control.server.service.WalletService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServerExpenseService implements ExpenseService {
  ExpenseRepository repository;
  WalletService walletService;

  @Override
  @Transactional
  public Collection<Expense> getExpensesByWalletId(Long walletId) {
    Wallet wallet = walletService.getWalletById(walletId);
    return repository.findAllByWallet(wallet);
  }

  @Override
  public Expense getExpenseById(Long id) {
    return repository.findById(id).orElseThrow(() -> new ExpenseNotFoundException(id));
  }

  @Override
  public void deleteById(Long id) {
    repository.deleteById(id);
  }

  @Override
  public void save(Expense expense) {
    repository.save(expense);
  }

  @Override
  public ExpenseType parseExpenseType(String expenseType) {
    try {
      return ExpenseType.valueOf(expenseType.toUpperCase());
    } catch (IllegalArgumentException e) {
      return ExpenseType.OTHER;
    }
  }
}
