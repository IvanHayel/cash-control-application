package by.hayel.cash.control.server.service.impl;

import by.hayel.cash.control.server.domain.wallet.Income;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import by.hayel.cash.control.server.exception.IncomeNotFoundException;
import by.hayel.cash.control.server.repository.IncomeRepository;
import by.hayel.cash.control.server.service.IncomeService;
import by.hayel.cash.control.server.service.WalletService;
import java.util.ArrayList;
import java.util.Collection;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServerIncomeService implements IncomeService {
  IncomeRepository repository;
  WalletService walletService;

  @Override
  @Transactional
  public Collection<Income> getIncomesByOwnerId(Long ownerId) {
    Collection<Wallet> walletsByOwnerId = walletService.getWalletsByOwnerId(ownerId);
    Collection<Income> incomes = new ArrayList<>();
    walletsByOwnerId.forEach(wallet -> incomes.addAll(repository.findAllByWallet(wallet)));
    return incomes;
  }

  @Override
  public Income getIncomeById(Long id) {
    return repository.findById(id).orElseThrow(() -> new IncomeNotFoundException(id));
  }

  @Override
  public void deleteById(Long id) {
    repository.deleteById(id);
  }

  @Override
  public void save(Income income) {
    repository.save(income);
  }
}
