package by.hayel.cash.control.server.service;

import by.hayel.cash.control.server.domain.user.Role;
import by.hayel.cash.control.server.domain.user.ServerRole;

import java.util.Set;

public interface RoleService {
  Role getByName(ServerRole name);

  Role parseRole(String role);

  Set<Role> parseRoles(Set<String> roles);
}
