package by.hayel.cash.control.server.domain.error;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdviceErrorMessage {
  LocalDateTime timestamp;
  int statusCode;
  String message;
  String description;

  public AdviceErrorMessage(int statusCode, String message, String description) {
    this.statusCode = statusCode;
    this.message = message;
    this.description = description;
    timestamp = LocalDateTime.now();
  }
}
