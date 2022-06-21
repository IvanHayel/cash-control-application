package by.hayel.cash.control.server.payload.request.wallet;

import by.hayel.cash.control.server.payload.request.ClientRequest;
import by.hayel.cash.control.server.validation.IsoZonedDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IncomeRequest implements ClientRequest {
  @NotNull
  @Min(0)
  Double amount;

  @Min(0)
  @NotNull
  Long wallet;

  @NotNull @NotBlank @IsoZonedDateTime String timestamp;
}
