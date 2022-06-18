package by.hayel.cash.control.server.payload.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateUserRequest implements ClientRequest {
    String username;
    String email;
    Set<String> roles;
}