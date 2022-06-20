package by.hayel.cash.control.server.exception;

import java.io.Serial;

public class WalletNotFoundException extends RuntimeException {
  @Serial private static final long serialVersionUID = 1L;

  private static final String DEFAULT_MESSAGE = "Error -> Wallet not found!";
  private static final String MESSAGE_WITH_ID = "Error -> Wallet with id %d not found!";

  public WalletNotFoundException() {
    super(DEFAULT_MESSAGE);
  }

  public WalletNotFoundException(Long id) {
    super(String.format(MESSAGE_WITH_ID, id));
  }
}
