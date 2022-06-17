package by.hayel.cash.control.server.payload.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtResponse implements ServerResponse {
  public static final String DEFAULT_TOKEN_TYPE = "Bearer";

  String token;
  String tokenType = DEFAULT_TOKEN_TYPE;
  String refreshToken;
  Long id;
  String username;
  String email;
  List<String> roles;

  public JwtResponse(
      String token,
      String refreshToken,
      Long id,
      String username,
      String email,
      List<String> roles) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
