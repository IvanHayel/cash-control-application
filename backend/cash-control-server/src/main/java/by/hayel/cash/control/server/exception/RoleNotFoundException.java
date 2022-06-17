package by.hayel.cash.control.server.exception;

import java.io.Serial;

public class RoleNotFoundException extends RuntimeException {
  @Serial private static final long serialVersionUID = 1L;

  private static final String DEFAULT_MESSAGE = "Error -> Role not found!";

  public RoleNotFoundException() {
    super(DEFAULT_MESSAGE);
  }
}
