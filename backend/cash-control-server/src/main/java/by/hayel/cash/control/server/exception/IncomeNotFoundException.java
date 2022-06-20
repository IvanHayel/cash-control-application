package by.hayel.cash.control.server.exception;

import java.io.Serial;

public class IncomeNotFoundException extends RuntimeException {
  @Serial private static final long serialVersionUID = 1L;

  private static final String DEFAULT_MESSAGE = "Error -> Income not found!";
  private static final String MESSAGE_WITH_ID = "Error -> Income with id %d not found!";

  public IncomeNotFoundException() {
    super(DEFAULT_MESSAGE);
  }

  public IncomeNotFoundException(Long id) {
    super(String.format(MESSAGE_WITH_ID, id));
  }
}
