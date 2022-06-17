package by.hayel.cash.control.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class TokenRefreshException extends RuntimeException {
  @Serial private static final long serialVersionUID = 1L;

  private static final String DEFAULT_MESSAGE = "Error -> Token is invalid!";
  private static final String MESSAGE_WITH_TOKEN = "Error -> Token %s is invalid!";
  private static final String MESSAGE_WITH_TOKEN_AND_CAUSE =
      "Error -> Token %s is invalid! Cause: %s";

  public TokenRefreshException() {
    super(DEFAULT_MESSAGE);
  }

  public TokenRefreshException(String token) {
    super(String.format(MESSAGE_WITH_TOKEN, token));
  }

  public TokenRefreshException(String token, String cause) {
    super(String.format(MESSAGE_WITH_TOKEN_AND_CAUSE, token, cause));
  }
}
