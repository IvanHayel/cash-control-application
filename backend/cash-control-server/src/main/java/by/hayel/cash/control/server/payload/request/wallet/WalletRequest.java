package by.hayel.cash.control.server.payload.request.wallet;

import by.hayel.cash.control.server.payload.request.ClientRequest;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WalletRequest implements ClientRequest {
  @NotBlank
  @Size(min = 3, max = 20)
  String name;

  @NotNull String currency;

  @NotNull Double balance;
}
