package by.hayel.cash.control.server.service;

import by.hayel.cash.control.server.domain.wallet.Transfer;
import java.util.Collection;

public interface TransferService {
  Collection<Transfer> getTransfersByOwnerId(Long ownerId);

  Transfer getTransferById(Long id);

  void deleteById(Long id);

  void save(Transfer transfer);
}
