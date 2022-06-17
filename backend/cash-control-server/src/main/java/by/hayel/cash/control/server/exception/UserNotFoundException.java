package by.hayel.cash.control.server.exception;

import java.io.Serial;

public class UserNotFoundException extends RuntimeException {
  @Serial private static final long serialVersionUID = 1L;

  private static final String DEFAULT_MESSAGE = "Error -> User not found!";
  private static final String MESSAGE_WITH_ID = "Error -> User with id %d not found!";

  public UserNotFoundException() {
    super(DEFAULT_MESSAGE);
  }

  public UserNotFoundException(Long id) {
    super(String.format(MESSAGE_WITH_ID, id));
  }
}
