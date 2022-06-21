package by.hayel.cash.control.server.controller.advice;

import by.hayel.cash.control.server.domain.error.AdviceErrorMessage;
import by.hayel.cash.control.server.exception.ExpenseNotFoundException;
import by.hayel.cash.control.server.exception.IncomeNotFoundException;
import by.hayel.cash.control.server.exception.TransferNotFoundException;
import by.hayel.cash.control.server.exception.WalletNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class WalletControllerAdvice {
  @ExceptionHandler(WalletNotFoundException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public AdviceErrorMessage handleWalletNotFoundException(
      WalletNotFoundException exception, WebRequest request) {
    return new AdviceErrorMessage(
        HttpStatus.BAD_REQUEST.value(), exception.getMessage(), request.getDescription(false));
  }

  @ExceptionHandler(IncomeNotFoundException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public AdviceErrorMessage handleIncomeNotFoundException(
      IncomeNotFoundException exception, WebRequest request) {
    return new AdviceErrorMessage(
        HttpStatus.BAD_REQUEST.value(), exception.getMessage(), request.getDescription(false));
  }

  @ExceptionHandler(ExpenseNotFoundException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public AdviceErrorMessage handleExpenseNotFoundException(
      ExpenseNotFoundException exception, WebRequest request) {
    return new AdviceErrorMessage(
        HttpStatus.BAD_REQUEST.value(), exception.getMessage(), request.getDescription(false));
  }

  @ExceptionHandler(TransferNotFoundException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public AdviceErrorMessage handleTransferNotFoundException(
      TransferNotFoundException exception, WebRequest request) {
    return new AdviceErrorMessage(
        HttpStatus.BAD_REQUEST.value(), exception.getMessage(), request.getDescription(false));
  }
}
