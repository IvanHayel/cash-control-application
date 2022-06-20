package by.hayel.cash.control.server.service.impl;

import by.hayel.cash.control.server.domain.user.User;
import by.hayel.cash.control.server.domain.wallet.Currency;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import by.hayel.cash.control.server.exception.WalletNotFoundException;
import by.hayel.cash.control.server.repository.WalletRepository;
import by.hayel.cash.control.server.service.UserService;
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
public class ServerWalletService implements WalletService {
  WalletRepository repository;
  UserService userService;

  @Override
  @Transactional
  public Collection<Wallet> getWalletsByOwnerId(Long ownerId) {
    User user = userService.getUserById(ownerId);
    return repository.findAllByOwner(user);
  }

  @Override
  public Wallet getWalletById(Long id) {
    return repository.findById(id).orElseThrow(() -> new WalletNotFoundException(id));
  }

  @Override
  public void deleteById(Long walletId) {
    repository.deleteById(walletId);
  }

  @Override
  public void save(Wallet wallet) {
    repository.save(wallet);
  }

  @Override
  public Currency parseCurrency(String currency) {
    try {
      return Currency.valueOf(currency.toUpperCase());
    } catch (IllegalArgumentException e) {
      return Currency.UNKNOWN;
    }
  }
}
