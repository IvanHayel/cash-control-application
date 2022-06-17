package by.hayel.cash.control.server.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/test")
public class TestAccessController {
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasAnyRole('USER', 'MODERATOR', 'ADMIN', 'ROOT')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/moderator")
  @PreAuthorize("hasAnyRole('MODERATOR', 'ROOT')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasAnyRole('ADMIN', 'ROOT')")
  public String adminAccess() {
    return "Admin Board.";
  }

  @GetMapping("/root")
  @PreAuthorize("hasRole('ROOT')")
  public String rootAccess() {
    return "Root only.";
  }
}
