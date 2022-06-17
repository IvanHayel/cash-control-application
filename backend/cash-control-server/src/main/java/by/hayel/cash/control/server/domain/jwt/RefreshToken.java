package by.hayel.cash.control.server.domain.jwt;

import by.hayel.cash.control.server.domain.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.Instant;

@Entity(name = "refresh_token")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RefreshToken {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @OneToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  User user;

  @Column(nullable = false, unique = true)
  String token;

  @Column(nullable = false)
  Instant expiryDate;
}
