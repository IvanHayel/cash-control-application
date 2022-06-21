package by.hayel.cash.control.server.controller;

import by.hayel.cash.control.server.domain.user.User;
import by.hayel.cash.control.server.payload.request.user.UpdateUserRequest;
import by.hayel.cash.control.server.payload.response.MessageResponse;
import by.hayel.cash.control.server.payload.response.ServerResponse;
import by.hayel.cash.control.server.service.RoleService;
import by.hayel.cash.control.server.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
  UserService userService;
  RoleService roleService;

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

  @PutMapping("/update/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'ROOT')")
  public ResponseEntity<ServerResponse> updateUser(
      @PathVariable Long id, @Valid @RequestBody UpdateUserRequest request) {
    User updatedUser = userService.getUserById(id);
    var roles = roleService.parseRoles(request.getRoles());
    updatedUser.setUsername(request.getUsername());
    updatedUser.setEmail(request.getEmail());
    updatedUser.setRoles(roles);
    userService.save(updatedUser);
    return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
  }
}
