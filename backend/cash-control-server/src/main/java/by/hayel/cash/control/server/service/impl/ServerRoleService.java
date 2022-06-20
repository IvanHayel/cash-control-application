package by.hayel.cash.control.server.service.impl;

import by.hayel.cash.control.server.domain.user.Role;
import by.hayel.cash.control.server.domain.user.ServerRole;
import by.hayel.cash.control.server.exception.RoleNotFoundException;
import by.hayel.cash.control.server.repository.RoleRepository;
import by.hayel.cash.control.server.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ServerRoleService implements RoleService {
    RoleRepository repository;

    @Override
    public Role getByName(ServerRole name) {
        return repository.findByName(name)
                .orElseThrow(RoleNotFoundException::new);
    }

    @Override
    public Role parseRole(String role) {
        try {
            return getByName(ServerRole.valueOf(role.toUpperCase()));
        } catch (IllegalArgumentException e) {
            return getByName(ServerRole.ROLE_USER);
        }
    }

    @Override
    public Set<Role> parseRoles(Set<String> requestRoles) {
        Set<Role> roleSet = new HashSet<>();
        if (requestRoles == null) {
            Role user = getByName(ServerRole.ROLE_USER);
            roleSet.add(user);
        } else {
            requestRoles.forEach(role -> roleSet.add(parseRole(role)));
        }
        return roleSet;
    }
}