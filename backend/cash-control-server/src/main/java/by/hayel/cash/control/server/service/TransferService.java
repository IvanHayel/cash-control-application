package by.hayel.cash.control.server.service;

import by.hayel.cash.control.server.domain.wallet.Transfer;

import java.util.Collection;

public interface TransferService {
  Collection<Transfer> getTransfersByWalletId(Long walletId);

  Transfer getTransferById(Long id);

  void deleteById(Long id);

  void save(Transfer transfer);
}
