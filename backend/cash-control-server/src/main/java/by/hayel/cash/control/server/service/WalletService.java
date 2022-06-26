package by.hayel.cash.control.server.service;

import by.hayel.cash.control.server.domain.wallet.Currency;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import java.util.Collection;

public interface WalletService {
  Collection<Wallet> getWalletsByOwnerId(Long ownerId);

  Wallet getWalletById(Long id);

  void deleteById(Long walletId);

  void save(Wallet wallet);

  Currency parseCurrency(String currency);

  Double calculateBalanceIncome(Double balance, Double income);

  Double calculateBalanceExpense(Double balance, Double expense);
}
