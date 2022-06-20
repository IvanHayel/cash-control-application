package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.wallet.Transfer;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
  List<Transfer> findAllByWallet(Wallet wallet);
}
