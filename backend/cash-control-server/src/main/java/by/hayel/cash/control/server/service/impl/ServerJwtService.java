package by.hayel.cash.control.server.service.impl;

import by.hayel.cash.control.server.exception.HttpRequestTokenNotFoundException;
import by.hayel.cash.control.server.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServerJwtService implements JwtService {
  private static final String INVALID_JWT_SIGNATURE_LOG = "Invalid JWT signature -> {}";
  private static final String INVALID_JWT_TOKEN_LOG = "Invalid token -> {}";
  private static final String TOKEN_EXPIRED_LOG = "Token is expired -> {}";
  private static final String TOKEN_UNSUPPORTED_LOG = "Token is unsupported -> {}";
  private static final String CLAIMS_IS_EMPTY_LOG = "JWT claims string is empty -> {}";

  @Value("${jwt.secret}")
  String secret;

  @Value("${jwt.expiration-time}")
  long expirationTime;

  @Value("${jwt.header.name}")
  String headerName;

  @Value("${jwt.type}")
  String type;

  @Override
  public String generateToken(UserDetails userPrincipal) {
    return generateTokenFromUsername(userPrincipal.getUsername());
  }

  public String generateTokenFromUsername(String username) {
    Date now = new Date();
    ZonedDateTime expiryZonedDate =
        LocalDateTime.now().plus(expirationTime, ChronoUnit.MILLIS).atZone(ZoneId.systemDefault());
    Date expiryDate = Date.from(expiryZonedDate.toInstant());
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(SignatureAlgorithm.HS512, secret)
        .compact();
  }

  public String getUsernameFromToken(String token) {
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
  }

  @Override
  public String getTokenFromRequest(HttpServletRequest request) {
    String header = request.getHeader(headerName);
    if (StringUtils.hasText(header) && header.startsWith(type)) {
      return header.substring(type.length() + 1);
    }
    throw new HttpRequestTokenNotFoundException();
  }

  public boolean isTokenValid(String authToken) {
    try {
      Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
      return true;
    } catch (SignatureException e) {
      log.error(INVALID_JWT_SIGNATURE_LOG, e.getMessage());
    } catch (MalformedJwtException e) {
      log.error(INVALID_JWT_TOKEN_LOG, e.getMessage());
    } catch (ExpiredJwtException e) {
      log.error(TOKEN_EXPIRED_LOG, e.getMessage());
    } catch (UnsupportedJwtException e) {
      log.error(TOKEN_UNSUPPORTED_LOG, e.getMessage());
    } catch (IllegalArgumentException e) {
      log.error(CLAIMS_IS_EMPTY_LOG, e.getMessage());
    }
    return false;
  }
}
