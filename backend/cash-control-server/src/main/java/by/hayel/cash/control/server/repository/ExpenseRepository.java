package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.wallet.Expense;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  List<Expense> findAllByWallet(Wallet wallet);
}
