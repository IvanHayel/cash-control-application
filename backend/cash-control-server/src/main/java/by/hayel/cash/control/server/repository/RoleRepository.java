package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.user.Role;
import by.hayel.cash.control.server.domain.user.ServerRole;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ServerRole name);
}
