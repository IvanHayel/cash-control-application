package by.hayel.cash.control.server.service;

import by.hayel.cash.control.server.domain.wallet.Income;
import java.util.Collection;

public interface IncomeService {
  Collection<Income> getIncomesByOwnerId(Long ownerId);

  Income getIncomeById(Long id);

  void deleteById(Long id);

  void save(Income income);
}
