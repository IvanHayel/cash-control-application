package by.hayel.cash.control.server.service;

import by.hayel.cash.control.server.domain.user.User;

import java.util.Collection;

public interface UserService {
  Collection<User> getAllUsers();

  boolean isUsernameAlreadyExist(String username);

  boolean isEmailAlreadyExist(String email);

  void save(User user);

  void deleteById(Long id);
}
