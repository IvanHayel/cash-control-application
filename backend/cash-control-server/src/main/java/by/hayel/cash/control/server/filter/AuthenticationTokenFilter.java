package by.hayel.cash.control.server.filter;

import by.hayel.cash.control.server.service.JwtService;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationTokenFilter extends OncePerRequestFilter {
  private static final String SIGN_IN = "/api/auth/sign-in";
  private static final String SIGN_UP = "/api/auth/sign-up";

  private static final String AUTHENTICATE_ERROR_LOG = "Unable to authenticate user -> {}";

  JwtService jwtService;
  UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String requestUri = request.getRequestURI();
      boolean isAuthenticationRequest = requestUri.equals(SIGN_IN) || requestUri.equals(SIGN_UP);
      if (isAuthenticationRequest) {
        filterChain.doFilter(request, response);
        return;
      }
      String token = jwtService.getTokenFromRequest(request);
      if (token != null && jwtService.isTokenValid(token)) {
        String username = jwtService.getUsernameFromToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        var authorities = userDetails.getAuthorities();
        var authentication =
            new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
        var authenticationDetails = new WebAuthenticationDetailsSource().buildDetails(request);
        authentication.setDetails(authenticationDetails);
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception e) {
      log.warn(AUTHENTICATE_ERROR_LOG, e.getMessage());
    }
    filterChain.doFilter(request, response);
  }
}
