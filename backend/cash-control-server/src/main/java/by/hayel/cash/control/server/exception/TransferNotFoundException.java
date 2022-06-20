package by.hayel.cash.control.server.exception;

import java.io.Serial;

public class TransferNotFoundException extends RuntimeException {
  @Serial private static final long serialVersionUID = 1L;

  private static final String DEFAULT_MESSAGE = "Error -> Transfer not found!";
  private static final String MESSAGE_WITH_ID = "Error -> Transfer with id %d not found!";

  public TransferNotFoundException() {
    super(DEFAULT_MESSAGE);
  }

  public TransferNotFoundException(Long id) {
    super(String.format(MESSAGE_WITH_ID, id));
  }
}
