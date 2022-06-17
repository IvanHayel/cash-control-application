package by.hayel.cash.control.server.exception;

import java.io.Serial;

public class HttpRequestTokenNotFoundException extends RuntimeException {
  @Serial private static final long serialVersionUID = 1L;

  private static final String DEFAULT_MESSAGE = "Warning -> Token not found in request headers!";

  public HttpRequestTokenNotFoundException() {
    super(DEFAULT_MESSAGE);
  }
}
