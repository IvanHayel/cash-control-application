package by.hayel.cash.control.server.controller;

import by.hayel.cash.control.server.domain.user.User;
import by.hayel.cash.control.server.domain.user.UserPrincipal;
import by.hayel.cash.control.server.domain.wallet.Currency;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import by.hayel.cash.control.server.payload.request.wallet.WalletRequest;
import by.hayel.cash.control.server.payload.response.MessageResponse;
import by.hayel.cash.control.server.payload.response.ServerResponse;
import by.hayel.cash.control.server.service.UserService;
import by.hayel.cash.control.server.service.WalletService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WalletController {
  WalletService walletService;
  UserService userService;

  @GetMapping("/user/{userId}")
  public Collection<Wallet> getWallets(@PathVariable Long userId) {
    return walletService.getWalletsByOwnerId(userId);
  }

  @PostMapping("/new")
  public ResponseEntity<ServerResponse> createWallet(@Valid @RequestBody WalletRequest request) {
    var authentication = SecurityContextHolder.getContext().getAuthentication();
    UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
    User owner = userService.getUserById(principal.getId());
    Currency currency = walletService.parseCurrency(request.getCurrency());
    Wallet wallet = new Wallet();
    wallet.setName(request.getName());
    wallet.setBalance(request.getBalance());
    wallet.setCurrency(currency);
    wallet.setOwner(owner);
    walletService.save(wallet);
    return ResponseEntity.ok(new MessageResponse("Wallet created successfully!"));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<ServerResponse> deleteWallet(@PathVariable Long id) {
    walletService.deleteById(id);
    return ResponseEntity.ok(new MessageResponse("Wallet deleted successfully!"));
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<ServerResponse> updateWallet(
      @PathVariable Long id, @Valid @RequestBody WalletRequest request) {
    Wallet walletToUpdate = walletService.getWalletById(id);
    Currency currency = walletService.parseCurrency(request.getCurrency());
    walletToUpdate.setName(request.getName());
    walletToUpdate.setCurrency(currency);
    walletToUpdate.setBalance(request.getBalance());
    walletService.save(walletToUpdate);
    return ResponseEntity.ok(new MessageResponse("Wallet updated successfully!"));
  }
}
