# 🛒 Модуль: Orders & Checkout (Заказы)

Обработка корзины, создание заказов и история покупок.

## 📦 Package: `com.fellbach.api.order`

## 1. 🏗 Entities

### `Order.java`
Заголовок заказа.

```java
@Entity
@Table(name = "orders")
public class Order {
    @Id
    private Long id; // Или UUID

    private String orderNumber; // "ORD-2024-001"
    
    @ManyToOne
    private User user; // Опционально (если гость)
    
    private String customerEmail;
    
    // Адрес доставки (Embeddable или отдельная сущность)
    @Embedded
    private Address shippingAddress;
    
    private BigDecimal itemsTotal;
    private BigDecimal shippingCost;
    private BigDecimal grandTotal;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status; // NEW, PAID, SHIPPED, DELIVERED
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
    
    private LocalDateTime createdAt;
}
```

### `OrderItem.java`
Позиция в заказе. Хранит снимок цены на момент покупки!

```java
@Entity
public class OrderItem {
    @Id
    private Long id;
    
    @ManyToOne
    private Order order;
    
    @ManyToOne
    private Wine wine;
    
    private String wineName; // Копия имени (вдруг вино удалят)
    private Integer quantity;
    private BigDecimal pricePerUnit; // Цена на момент покупки
}
```

## 2. 🔄 DTOs

### `CreateOrderRequest.java`
Данные корзины при чекауте.
```java
public record CreateOrderRequest(
    List<CartItemDTO> items,
    AddressDTO shippingAddress,
    String paymentMethod,
    String email
) {}
```

## 3. ⚙️ Services

### `OrderService.java`
*   `Order createOrder(CreateOrderRequest req)`
    1.  Валидация наличия товаров (`WineService.checkStock`).
    2.  Расчет сумм.
    3.  Сохранение заказа со статусом `NEW`.
    4.  Уменьшение стока (`WineService.decreaseStock`).
    5.  Инициация оплаты.

### `CartService.java` (Опционально)
*   Если корзина хранится на сервере (Redis), нужны методы `addToCart`, `getCart`.
*   В MVP корзина живет в `localStorage` браузера и прилетает целиком в `CreateOrderRequest`.

## 4. 🎮 Controllers

### `OrderController.java`
*   `POST /api/orders` — Оформление заказа.
*   `GET /api/orders/{id}` — Статус заказа.
*   `GET /api/orders/history` — История (для авторизованных).
