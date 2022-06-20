package by.hayel.cash.control.server.domain.wallet;

import by.hayel.cash.control.server.domain.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallets")
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Wallet {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @NotBlank String name;

  @Enumerated(EnumType.STRING)
  @NotNull
  Currency currency;

  @NotNull Double balance;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "owner_id", referencedColumnName = "id")
  @JsonIgnore
  User owner;

  LocalDateTime created;

  LocalDateTime modified;

  @PrePersist
  void onCreate() {
    created = LocalDateTime.now();
  }

  @PreUpdate
  void onUpdate() {
    modified = LocalDateTime.now();
  }
}
