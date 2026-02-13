# 👤 Модуль: User & Loyalty (Пользователи и Бонусы)

Управление профилями пользователей и бонусной системой "Earn & Burn".

## 📦 Package: `com.fellbach.api.user`

## 1. 🏗 Entities

### `AppUser.java`
Расширение данных пользователя из Supabase Auth.
Id здесь = UUID из Supabase.

```java
@Entity
@Table(name = "users")
public class AppUser {
    @Id
    private UUID id; // References Supabase Auth UID

    private String email;
    private String fullName;
    
    // Loyalty
    private Integer loyaltyPointsPoints; // Текущий баланс
    private String loyaltyTier; // BRONZE, SILVER, GOLD
    
    // Metadata
    private LocalDate birthDate; // Для проверки 18+ и поздравлений
}
```

### `LoyaltyTransaction.java`
История начислений и списаний.

```java
@Entity
public class LoyaltyTransaction {
    @Id
    private Long id;
    
    @ManyToOne
    private AppUser user;
    
    private Integer points; // +50 or -100
    private String description; // "Order #123 cashback" or "Reward redemption"
    
    @Enumerated(EnumType.STRING)
    private TransactionType type; // EARN, BURN, ADJUSTMENT
    
    private LocalDateTime createdAt;
}
```

## 2. ⚙️ Services

### `UserService.java`
*   `syncUser(UserDTO supabaseUser)` — создание записи при первом входе.
*   `AppUser getCurrentUser()` — получение из контекста безопасности.

### `LoyaltyService.java`
*   `void awardPoints(UUID userId, BigDecimal orderAmount)` — начисление (например, 1 евро = 1 балл).
*   `void redeemPoints(UUID userId, Integer points)` — списание.
*   `boolean hasEnoughPoints(UUID userId, Integer points)`.

## 3. 🎮 Controllers

### `UserController.java`
*   `GET /api/users/me` — профиль + баланс.
*   `PATCH /api/users/me` — обновление данных.

### `LoyaltyController.java`
*   `GET /api/loyalty/history` — история транзакций.
*   `POST /api/loyalty/convert` — (опционально) обмен баллов на купоны.
