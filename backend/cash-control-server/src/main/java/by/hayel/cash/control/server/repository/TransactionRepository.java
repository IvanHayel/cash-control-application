package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.wallet.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {}
