package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.wallet.Transfer;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
  List<Transfer> findAllByWallet(Wallet wallet);
}
