package by.hayel.cash.control.server.service.impl;

import by.hayel.cash.control.server.domain.wallet.Transfer;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import by.hayel.cash.control.server.exception.TransferNotFoundException;
import by.hayel.cash.control.server.repository.TransferRepository;
import by.hayel.cash.control.server.service.TransferService;
import by.hayel.cash.control.server.service.WalletService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServerTransferService implements TransferService {
  TransferRepository repository;
  WalletService walletService;

  @Override
  @Transactional
  public Collection<Transfer> getTransfersByWalletId(Long walletId) {
    Wallet wallet = walletService.getWalletById(walletId);
    return repository.findAllByWallet(wallet);
  }

  @Override
  public Transfer getTransferById(Long id) {
    return repository.findById(id).orElseThrow(() -> new TransferNotFoundException(id));
  }

  @Override
  public void deleteById(Long id) {
    repository.deleteById(id);
  }

  @Override
  public void save(Transfer transfer) {
    repository.save(transfer);
  }
}
