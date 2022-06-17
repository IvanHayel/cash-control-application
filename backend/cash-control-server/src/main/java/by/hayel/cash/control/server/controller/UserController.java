package by.hayel.cash.control.server.controller;

import by.hayel.cash.control.server.domain.user.User;
import by.hayel.cash.control.server.payload.response.MessageResponse;
import by.hayel.cash.control.server.payload.response.ServerResponse;
import by.hayel.cash.control.server.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
  UserService userService;

  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'ROOT')")
  public Collection<User> getAllUsers() {
    return userService.getAllUsers();
  }

  @DeleteMapping("/delete/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'ROOT')")
  public ResponseEntity<ServerResponse> deleteById(@PathVariable Long id) {
    userService.deleteById(id);
    return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
  }
}
