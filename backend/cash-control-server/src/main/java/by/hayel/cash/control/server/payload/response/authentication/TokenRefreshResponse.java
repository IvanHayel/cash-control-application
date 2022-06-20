package by.hayel.cash.control.server.payload.response.authentication;

import by.hayel.cash.control.server.payload.response.ServerResponse;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TokenRefreshResponse implements ServerResponse {
  public static final String DEFAULT_TOKEN_TYPE = "Bearer";

  String accessToken;
  String refreshToken;
  String tokenType = DEFAULT_TOKEN_TYPE;

  public TokenRefreshResponse(String accessToken, String refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
