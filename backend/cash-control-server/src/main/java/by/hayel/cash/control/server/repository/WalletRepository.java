package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.user.User;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
  List<Wallet> findAllByOwner(User owner);
}
