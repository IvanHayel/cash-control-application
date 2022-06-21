package by.hayel.cash.control.server.domain.wallet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "incomes")
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Income {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;

  @NotNull Double amount;

  @ManyToOne(fetch = FetchType.LAZY)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "wallet_id", referencedColumnName = "id")
  @JsonIgnore
  Wallet wallet;

  @NotNull LocalDateTime timestamp;

  Long walletTransportId;

  LocalDateTime created;

  LocalDateTime modified;

  @PrePersist
  void onCreate() {
    created = LocalDateTime.now();
    modified = LocalDateTime.now();
    walletTransportId = wallet.getId();
  }

  @PreUpdate
  void onUpdate() {
    modified = LocalDateTime.now();
    walletTransportId = wallet.getId();
  }
}
