package by.hayel.cash.control.server.controller;

import by.hayel.cash.control.server.domain.wallet.Expense;
import by.hayel.cash.control.server.domain.wallet.ExpenseType;
import by.hayel.cash.control.server.domain.wallet.Wallet;
import by.hayel.cash.control.server.payload.request.wallet.ExpenseRequest;
import by.hayel.cash.control.server.payload.response.MessageResponse;
import by.hayel.cash.control.server.payload.response.ServerResponse;
import by.hayel.cash.control.server.service.ExpenseService;
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
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExpenseController {
  ExpenseService expenseService;
  WalletService walletService;

  @GetMapping("/user/{userId}")
  public Collection<Expense> getExpenses(@PathVariable Long userId) {
    return expenseService.getExpensesByOwnerId(userId);
  }

  @PostMapping
  public ResponseEntity<ServerResponse> createExpense(@Valid @RequestBody ExpenseRequest request) {
    Wallet wallet = walletService.getWalletById(request.getWallet());
    LocalDateTime timestamp =
        LocalDateTime.parse(request.getTimestamp(), DateTimeFormatter.ISO_ZONED_DATE_TIME);
    ExpenseType expenseType = expenseService.parseExpenseType(request.getType());
    Expense expense = new Expense();
    expense.setAmount(request.getAmount());
    expense.setWallet(wallet);
    expense.setTimestamp(timestamp);
    expense.setType(expenseType);
    expenseService.save(expense);
    Double updatedBalance =
        walletService.calculateBalanceExpense(wallet.getBalance(), request.getAmount());
    wallet.setBalance(updatedBalance);
    walletService.save(wallet);
    return ResponseEntity.ok(new MessageResponse("Expense created successfully!"));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ServerResponse> deleteExpense(@PathVariable Long id) {
    Expense expenseToDelete = expenseService.getExpenseById(id);
    Wallet wallet = walletService.getWalletById(expenseToDelete.getWalletTransportId());
    Double updatedBalance =
        walletService.calculateBalanceIncome(wallet.getBalance(), expenseToDelete.getAmount());
    wallet.setBalance(updatedBalance);
    walletService.save(wallet);
    expenseService.deleteById(id);
    return ResponseEntity.ok(new MessageResponse("Expense deleted successfully!"));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ServerResponse> updateIncome(
      @PathVariable Long id, @Valid @RequestBody ExpenseRequest request) {
    Expense expenseToUpdate = expenseService.getExpenseById(id);
    LocalDateTime timestamp =
        LocalDateTime.parse(request.getTimestamp(), DateTimeFormatter.ISO_ZONED_DATE_TIME);
    ExpenseType expenseType = expenseService.parseExpenseType(request.getType());
    Long previousWalletId = expenseToUpdate.getWalletTransportId();
    Long newWalletId = request.getWallet();
    boolean isWalletChanged = !previousWalletId.equals(newWalletId);
    if (isWalletChanged) {
      Wallet previousWallet = walletService.getWalletById(previousWalletId);
      Double previousWalletUpdatedBalance =
          walletService.calculateBalanceIncome(
              previousWallet.getBalance(), expenseToUpdate.getAmount());
      previousWallet.setBalance(previousWalletUpdatedBalance);
      Wallet newWallet = walletService.getWalletById(newWalletId);
      Double newWalletUpdatedBalance =
          walletService.calculateBalanceExpense(newWallet.getBalance(), request.getAmount());
      newWallet.setBalance(newWalletUpdatedBalance);
      walletService.save(previousWallet);
      walletService.save(newWallet);
      expenseToUpdate.setWallet(newWallet);
    } else {
      Wallet wallet = walletService.getWalletById(newWalletId);
      wallet.setBalance(
          walletService.calculateBalanceIncome(wallet.getBalance(), expenseToUpdate.getAmount()));
      wallet.setBalance(
          walletService.calculateBalanceExpense(wallet.getBalance(), request.getAmount()));
      walletService.save(wallet);
      expenseToUpdate.setWallet(wallet);
    }
    expenseToUpdate.setAmount(request.getAmount());
    expenseToUpdate.setTimestamp(timestamp);
    expenseToUpdate.setType(expenseType);
    expenseService.save(expenseToUpdate);
    return ResponseEntity.ok(new MessageResponse("Expense updated successfully!"));
  }
}
