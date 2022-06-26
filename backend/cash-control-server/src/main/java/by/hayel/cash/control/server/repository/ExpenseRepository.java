package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.wallet.Expense;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  List<Expense> findAllByWallet(Wallet wallet);
}
