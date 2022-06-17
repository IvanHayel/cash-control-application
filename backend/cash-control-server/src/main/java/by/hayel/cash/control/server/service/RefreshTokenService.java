package by.hayel.cash.control.server.service;

import by.hayel.cash.control.server.domain.jwt.RefreshToken;

import java.util.Optional;

public interface RefreshTokenService {
  Optional<RefreshToken> findByToken(String token);

  RefreshToken createRefreshToken(Long userId);

  RefreshToken verifyExpiration(RefreshToken token);

  int deleteByUserId(Long userId);
}
