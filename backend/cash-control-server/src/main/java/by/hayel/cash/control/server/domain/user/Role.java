package by.hayel.cash.control.server.domain.user;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(
    name = "roles",
    uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  @NonNull
  private ServerRole name;
}
