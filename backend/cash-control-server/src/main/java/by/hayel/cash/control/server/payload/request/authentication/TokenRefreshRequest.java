package by.hayel.cash.control.server.payload.request.authentication;

import by.hayel.cash.control.server.payload.request.ClientRequest;
import javax.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TokenRefreshRequest implements ClientRequest {
  @NotBlank String refreshToken;
}
