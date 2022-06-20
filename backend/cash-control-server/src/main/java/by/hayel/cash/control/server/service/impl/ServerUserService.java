package by.hayel.cash.control.server.service.impl;

import by.hayel.cash.control.server.domain.user.User;
import by.hayel.cash.control.server.exception.UserNotFoundException;
import by.hayel.cash.control.server.repository.UserRepository;
import by.hayel.cash.control.server.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServerUserService implements UserService {
  UserRepository repository;

  @Override
  public Collection<User> getAllUsers() {
    return repository.findAll();
  }

  @Override
  public User getUserById(Long id) {
    return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  @Override
  public boolean isUsernameAlreadyExist(String username) {
    return Boolean.TRUE.equals(repository.existsByUsername(username));
  }

  @Override
  public boolean isEmailAlreadyExist(String email) {
    return Boolean.TRUE.equals(repository.existsByEmail(email));
  }

  @Override
  public void save(User user) {
    repository.save(user);
  }

  @Override
  public void deleteById(Long id) {
    repository.deleteById(id);
  }
}
