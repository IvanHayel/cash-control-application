package by.hayel.cash.control.server.payload.request.wallet;

import by.hayel.cash.control.server.payload.request.ClientRequest;
import by.hayel.cash.control.server.validation.IsoZonedDateTime;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransferRequest implements ClientRequest {
  @Min(0)
  @NotNull
  Double amount;

  @Min(0)
  @NotNull
  Long wallet;

  @Min(0)
  @NotNull
  Long target;

  @NotNull @NotBlank @IsoZonedDateTime String timestamp;
}
