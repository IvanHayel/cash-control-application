package by.hayel.cash.control.server.exception;

import java.io.Serial;

public class ExpenseNotFoundException extends RuntimeException {
  @Serial private static final long serialVersionUID = 1L;

  private static final String DEFAULT_MESSAGE = "Error -> Expense not found!";
  private static final String MESSAGE_WITH_ID = "Error -> Expense with id %d not found!";

  public ExpenseNotFoundException() {
    super(DEFAULT_MESSAGE);
  }

  public ExpenseNotFoundException(Long id) {
    super(String.format(MESSAGE_WITH_ID, id));
  }
}
