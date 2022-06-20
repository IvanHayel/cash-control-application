package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.wallet.Income;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
  List<Income> findAllByWallet(Wallet wallet);
}
