package by.hayel.cash.control.server.domain.wallet;

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
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @NotBlank Double amount;

  @NotBlank
  @Enumerated(EnumType.STRING)
  TransactionType type;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "wallet_id", referencedColumnName = "id")
  Wallet wallet;

  @NotBlank LocalDateTime timestamp;

  LocalDateTime created;

  @PrePersist
  void onCreate() {
    created = LocalDateTime.now();
  }
}
