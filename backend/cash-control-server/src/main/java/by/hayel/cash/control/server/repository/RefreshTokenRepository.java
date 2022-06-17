package by.hayel.cash.control.server.repository;

import by.hayel.cash.control.server.domain.jwt.RefreshToken;
import by.hayel.cash.control.server.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByUser(User user);

  Optional<RefreshToken> findByToken(String token);

  int deleteByUser(User user);
}
