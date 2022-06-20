package by.hayel.cash.control.server.payload.request.wallet;

import by.hayel.cash.control.server.payload.request.ClientRequest;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EditWalletRequest implements ClientRequest {
  String name;
  String currency;
  Double balance;
}
