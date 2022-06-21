package by.hayel.cash.control.server.payload.request.wallet;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExpenseRequest {
  Double amount;
  Long wallet;
  String timestamp;
  String type;
}
