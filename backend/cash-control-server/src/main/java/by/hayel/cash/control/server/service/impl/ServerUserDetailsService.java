package by.hayel.cash.control.server.service.impl;

import by.hayel.cash.control.server.domain.user.User;
import by.hayel.cash.control.server.domain.user.UserPrincipal;
import by.hayel.cash.control.server.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServerUserDetailsService implements UserDetailsService {
  private static final String USERNAME_NOT_FOUND_MESSAGE_FORMAT = "User \"%s\" not found!";

  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user =
        userRepository
            .findByUsername(username)
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        String.format(USERNAME_NOT_FOUND_MESSAGE_FORMAT, username)));
    return UserPrincipal.build(user);
  }
}
