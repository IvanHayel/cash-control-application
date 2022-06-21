package by.hayel.cash.control.server.controller;

import by.hayel.cash.control.server.domain.wallet.Transfer;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import by.hayel.cash.control.server.payload.request.wallet.TransferRequest;
import by.hayel.cash.control.server.payload.response.MessageResponse;
import by.hayel.cash.control.server.payload.response.ServerResponse;
import by.hayel.cash.control.server.service.TransferService;
import by.hayel.cash.control.server.service.WalletService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TransferController {
  TransferService transferService;
  WalletService walletService;

  @GetMapping("/user/{userId}")
  public Collection<Transfer> getTransfers(@PathVariable Long userId) {
    return transferService.getTransfersByOwnerId(userId);
  }

  @PostMapping("/new")
  public ResponseEntity<ServerResponse> createTransfer(
      @Valid @RequestBody TransferRequest request) {
    LocalDateTime timestamp =
        LocalDateTime.parse(request.getTimestamp(), DateTimeFormatter.ISO_ZONED_DATE_TIME);
    Wallet wallet = walletService.getWalletById(request.getWallet());
    Double updatedWalletBalance =
        walletService.calculateBalanceExpense(wallet.getBalance(), request.getAmount());
    wallet.setBalance(updatedWalletBalance);
    Wallet target = walletService.getWalletById(request.getTarget());
    Double updatedTargetBalance =
        walletService.calculateBalanceIncome(target.getBalance(), request.getAmount());
    target.setBalance(updatedTargetBalance);
    walletService.save(wallet);
    walletService.save(target);
    Transfer transfer = new Transfer();
    transfer.setAmount(request.getAmount());
    transfer.setWallet(wallet);
    transfer.setTarget(target);
    transfer.setTimestamp(timestamp);
    transferService.save(transfer);
    return ResponseEntity.ok(new MessageResponse("Transfer created successfully!"));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<ServerResponse> deleteTransfer(@PathVariable Long id) {
    Transfer transferToDelete = transferService.getTransferById(id);
    Wallet wallet = walletService.getWalletById(transferToDelete.getWalletTransportId());
    Double updatedWalletBalance =
        walletService.calculateBalanceIncome(wallet.getBalance(), transferToDelete.getAmount());
    wallet.setBalance(updatedWalletBalance);
    Wallet target = walletService.getWalletById(transferToDelete.getTargetTransportId());
    Double updatedTargetBalance =
        walletService.calculateBalanceExpense(target.getBalance(), transferToDelete.getAmount());
    target.setBalance(updatedTargetBalance);
    walletService.save(wallet);
    walletService.save(target);
    transferService.deleteById(id);
    return ResponseEntity.ok(new MessageResponse("Transfer deleted successfully!"));
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<ServerResponse> updateTransfer(
      @PathVariable Long id, @Valid @RequestBody TransferRequest request) {
    Transfer transferToUpdate = transferService.getTransferById(id);
    LocalDateTime timestamp =
        LocalDateTime.parse(request.getTimestamp(), DateTimeFormatter.ISO_ZONED_DATE_TIME);
    Long walletId = transferToUpdate.getWalletTransportId();
    Long targetId = transferToUpdate.getTargetTransportId();
    boolean isWalletChanged = !walletId.equals(request.getWallet());
    boolean isTargetChanged = !targetId.equals(request.getTarget());
    if (isWalletChanged) {
      Wallet previousWallet = walletService.getWalletById(walletId);
      Double updatedPreviousWalletBalance =
          walletService.calculateBalanceIncome(
              previousWallet.getBalance(), transferToUpdate.getAmount());
      previousWallet.setBalance(updatedPreviousWalletBalance);
      Wallet newWallet = walletService.getWalletById(request.getWallet());
      Double updatedNewWalletBalance =
          walletService.calculateBalanceExpense(newWallet.getBalance(), request.getAmount());
      newWallet.setBalance(updatedNewWalletBalance);
      walletService.save(previousWallet);
      walletService.save(newWallet);
      transferToUpdate.setWallet(newWallet);
    } else {
      Wallet wallet = walletService.getWalletById(walletId);
      Double updatedWalletPreviousBalance =
          walletService.calculateBalanceIncome(wallet.getBalance(), transferToUpdate.getAmount());
      wallet.setBalance(updatedWalletPreviousBalance);
      Double updatedWalletNewBalance =
          walletService.calculateBalanceExpense(wallet.getBalance(), request.getAmount());
      wallet.setBalance(updatedWalletNewBalance);
      walletService.save(wallet);
      transferToUpdate.setWallet(wallet);
    }
    if (isTargetChanged) {
      Wallet previousTarget = walletService.getWalletById(targetId);
      Double updatedPreviousTargetBalance =
          walletService.calculateBalanceExpense(
              previousTarget.getBalance(), transferToUpdate.getAmount());
      previousTarget.setBalance(updatedPreviousTargetBalance);
      Wallet newTarget = walletService.getWalletById(request.getTarget());
      Double updatedNewTargetBalance =
          walletService.calculateBalanceIncome(newTarget.getBalance(), request.getAmount());
      newTarget.setBalance(updatedNewTargetBalance);
      walletService.save(previousTarget);
      walletService.save(newTarget);
      transferToUpdate.setTarget(newTarget);
    } else {
      Wallet target = walletService.getWalletById(targetId);
      Double updatedTargetPreviousBalance =
          walletService.calculateBalanceExpense(target.getBalance(), transferToUpdate.getAmount());
      target.setBalance(updatedTargetPreviousBalance);
      Double updatedTargetNewBalance =
          walletService.calculateBalanceIncome(target.getBalance(), request.getAmount());
      target.setBalance(updatedTargetNewBalance);
      walletService.save(target);
      transferToUpdate.setTarget(target);
    }
    transferToUpdate.setAmount(request.getAmount());
    transferToUpdate.setTimestamp(timestamp);
    transferService.save(transferToUpdate);
    return ResponseEntity.ok(new MessageResponse("Transfer updated successfully!"));
  }
}
