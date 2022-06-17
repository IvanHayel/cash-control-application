package by.hayel.cash.control.server.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;

@AllArgsConstructor
@Getter
@EqualsAndHashCode(of = "id")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserPrincipal implements UserDetails {
  @Serial private static final long serialVersionUID = 1L;

  Long id;
  String username;
  String email;
  @JsonIgnore String password;
  Collection<? extends GrantedAuthority> authorities;

  public static UserPrincipal build(User user) {
    var authorities =
        user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority(role.getName().name()))
            .toList();
    return new UserPrincipal(
        user.getId(), user.getUsername(), user.getEmail(), user.getPassword(), authorities);
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
