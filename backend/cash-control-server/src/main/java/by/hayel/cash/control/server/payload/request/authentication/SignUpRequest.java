package by.hayel.cash.control.server.payload.request.authentication;

import by.hayel.cash.control.server.payload.request.ClientRequest;
import java.util.Set;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SignUpRequest implements ClientRequest {
  @NotBlank
  @Size(min = 3, max = 20)
  String username;

  @NotBlank
  @Size(max = 50)
  @Email
  String email;

  @NotBlank
  @Size(min = 3, max = 40)
  String password;

  Set<String> roles;
}
