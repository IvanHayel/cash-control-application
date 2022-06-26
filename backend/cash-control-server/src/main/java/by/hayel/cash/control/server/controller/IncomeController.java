package by.hayel.cash.control.server.controller;

import by.hayel.cash.control.server.domain.wallet.Income;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import by.hayel.cash.control.server.payload.request.wallet.IncomeRequest;
import by.hayel.cash.control.server.payload.response.MessageResponse;
import by.hayel.cash.control.server.payload.response.ServerResponse;
import by.hayel.cash.control.server.service.IncomeService;
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
@RequestMapping("/api/incomes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IncomeController {
  IncomeService incomeService;
  WalletService walletService;

  @GetMapping("/user/{userId}")
  public Collection<Income> getIncomes(@PathVariable Long userId) {
    return incomeService.getIncomesByOwnerId(userId);
  }

  @PostMapping
  public ResponseEntity<ServerResponse> createIncome(@Valid @RequestBody IncomeRequest request) {
    Wallet wallet = walletService.getWalletById(request.getWallet());
    LocalDateTime timestamp =
        LocalDateTime.parse(request.getTimestamp(), DateTimeFormatter.ISO_ZONED_DATE_TIME);
    Income income = new Income();
    income.setAmount(request.getAmount());
    income.setWallet(wallet);
    income.setTimestamp(timestamp);
    incomeService.save(income);
    Double updatedBalance =
        walletService.calculateBalanceIncome(wallet.getBalance(), request.getAmount());
    wallet.setBalance(updatedBalance);
    walletService.save(wallet);
    return ResponseEntity.ok(new MessageResponse("Income created successfully!"));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ServerResponse> deleteIncome(@PathVariable Long id) {
    Income incomeToDelete = incomeService.getIncomeById(id);
    Wallet wallet = walletService.getWalletById(incomeToDelete.getWalletTransportId());
    Double updatedBalance =
        walletService.calculateBalanceExpense(wallet.getBalance(), incomeToDelete.getAmount());
    wallet.setBalance(updatedBalance);
    walletService.save(wallet);
    incomeService.deleteById(id);
    return ResponseEntity.ok(new MessageResponse("Income deleted successfully!"));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ServerResponse> updateIncome(
      @PathVariable Long id, @Valid @RequestBody IncomeRequest request) {
    Income incomeToUpdate = incomeService.getIncomeById(id);
    LocalDateTime timestamp =
        LocalDateTime.parse(request.getTimestamp(), DateTimeFormatter.ISO_ZONED_DATE_TIME);
    Long previousWalletId = incomeToUpdate.getWalletTransportId();
    Long newWalletId = request.getWallet();
    boolean isWalletChanged = !previousWalletId.equals(newWalletId);
    if (isWalletChanged) {
      Wallet previousWallet = walletService.getWalletById(previousWalletId);
      Double previousWalletUpdatedBalance =
          walletService.calculateBalanceExpense(
              previousWallet.getBalance(), incomeToUpdate.getAmount());
      previousWallet.setBalance(previousWalletUpdatedBalance);
      Wallet newWallet = walletService.getWalletById(newWalletId);
      Double newWalletUpdatedBalance =
          walletService.calculateBalanceIncome(newWallet.getBalance(), request.getAmount());
      newWallet.setBalance(newWalletUpdatedBalance);
      walletService.save(previousWallet);
      walletService.save(newWallet);
      incomeToUpdate.setWallet(newWallet);
    } else {
      Wallet wallet = walletService.getWalletById(newWalletId);
      wallet.setBalance(
          walletService.calculateBalanceExpense(wallet.getBalance(), incomeToUpdate.getAmount()));
      wallet.setBalance(
          walletService.calculateBalanceIncome(wallet.getBalance(), request.getAmount()));
      walletService.save(wallet);
      incomeToUpdate.setWallet(wallet);
    }
    incomeToUpdate.setAmount(request.getAmount());
    incomeToUpdate.setTimestamp(timestamp);
    incomeService.save(incomeToUpdate);
    return ResponseEntity.ok(new MessageResponse("Income updated successfully!"));
  }
}
