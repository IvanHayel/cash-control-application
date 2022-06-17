package by.hayel.cash.control.server.service;

import org.springframework.security.core.userdetails.UserDetails;

import javax.servlet.http.HttpServletRequest;

public interface JwtService {
  String generateToken(UserDetails userDetails);

  String generateTokenFromUsername(String username);

  String getUsernameFromToken(String token);

  String getTokenFromRequest(HttpServletRequest request);

  boolean isTokenValid(String token);
}
