package by.hayel.cash.control.server.controller;

import by.hayel.cash.control.server.domain.jwt.RefreshToken;
import by.hayel.cash.control.server.domain.user.Role;
import by.hayel.cash.control.server.domain.user.User;
import by.hayel.cash.control.server.domain.user.UserPrincipal;
import by.hayel.cash.control.server.exception.TokenRefreshException;
import by.hayel.cash.control.server.payload.request.SignInRequest;
import by.hayel.cash.control.server.payload.request.SignOutRequest;
import by.hayel.cash.control.server.payload.request.SignUpRequest;
import by.hayel.cash.control.server.payload.request.TokenRefreshRequest;
import by.hayel.cash.control.server.payload.response.JwtResponse;
import by.hayel.cash.control.server.payload.response.MessageResponse;
import by.hayel.cash.control.server.payload.response.ServerResponse;
import by.hayel.cash.control.server.payload.response.TokenRefreshResponse;
import by.hayel.cash.control.server.service.JwtService;
import by.hayel.cash.control.server.service.RefreshTokenService;
import by.hayel.cash.control.server.service.RoleService;
import by.hayel.cash.control.server.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
  JwtService jwtService;
  UserService userService;
  RoleService roleService;
  RefreshTokenService refreshTokenService;
  AuthenticationManager authenticationManager;
  PasswordEncoder encoder;

  @PostMapping("/sign-in")
  public ResponseEntity<ServerResponse> authenticateUser(
      @Valid @RequestBody SignInRequest signInRequest) {
    var authenticationToken =
        new UsernamePasswordAuthenticationToken(
            signInRequest.getUsername(), signInRequest.getPassword());
    Authentication authentication = authenticationManager.authenticate(authenticationToken);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
    String token = jwtService.generateToken(principal);
    var roles = principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    RefreshToken refreshToken = refreshTokenService.createRefreshToken(principal.getId());
    ServerResponse response =
        new JwtResponse(
            token,
            refreshToken.getToken(),
            principal.getId(),
            principal.getUsername(),
            principal.getEmail(),
            roles);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/sign-up")
  public ResponseEntity<ServerResponse> registerUser(
      @Valid @RequestBody SignUpRequest signUpRequest) {
    if (userService.isUsernameAlreadyExist(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(MessageResponse.USERNAME_ALREADY_EXIST);
    }
    if (userService.isEmailAlreadyExist(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(MessageResponse.EMAIL_ALREADY_EXIST);
    }
    User user =
        new User(
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()));
    Set<String> requestRoles = signUpRequest.getRoles();
    Set<Role> roles = roleService.parseRoles(requestRoles);
    user.setRoles(roles);
    userService.save(user);
    return ResponseEntity.ok(MessageResponse.USER_REGISTRATION_SUCCESS);
  }

  @PostMapping("/sign-out")
  public ResponseEntity<ServerResponse> logoutUser(
      @Valid @RequestBody SignOutRequest signOutRequest) {
    refreshTokenService.deleteByUserId(signOutRequest.getUserId());
    return ResponseEntity.ok(MessageResponse.USER_LOGOUT_SUCCESS);
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<ServerResponse> refreshToken(
      @Valid @RequestBody TokenRefreshRequest request) {
    String requestRefreshToken = request.getRefreshToken();
    return refreshTokenService
        .findByToken(requestRefreshToken)
        .map(refreshTokenService::verifyExpiration)
        .map(RefreshToken::getUser)
        .map(
            user -> {
              String token = jwtService.generateTokenFromUsername(user.getUsername());
              ServerResponse response = new TokenRefreshResponse(token, requestRefreshToken);
              return ResponseEntity.ok(response);
            })
        .orElseThrow(() -> new TokenRefreshException(requestRefreshToken));
  }
}
