package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.user.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  @Override
  @NonNull
  @EntityGraph(value = "graph.User.withRoles")
  List<User> findAll();

  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}
