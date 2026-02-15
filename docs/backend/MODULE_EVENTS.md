# 📅 Модуль: Events (Мероприятия)

Управление дегустациями, винными турами и бронированием.

## 1. 🏗 Entities

### `Event.java`

```java
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug; // unique
    private String description;
    private String imageUrl;

    private LocalDate date;
    private String time;
    private String location;

    private BigDecimal pricePerPerson;
    private Integer totalSpots;
    private Integer bookedSpots;

    @Enumerated(EnumType.STRING)
    private EventCategory category;
    
    // Helper
    public boolean isFull() { return bookedSpots >= totalSpots; }
}
```

### `Booking.java`
```java
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Event event;
    
    private String customerName;
    private String customerEmail;
    private Integer guestsCount;
    private BigDecimal totalPrice;
    
    @Enumerated(EnumType.STRING)
    private BookingStatus status; // CONFIRMED
}
```

## 2. ⚙️ Services

### `EventService.java`
*   `getUpcomingEvents()`: Возвращает будущие события.
*   `getEventBySlug(String slug)`: Детали события.
*   `createBooking(BookingRequest)`: Регистрация на событие.
*   `createEvent(EventDTO)`: Создание (ADMIN).
*   `updateEvent(String slug, EventDTO)`: Обновление (ADMIN).
*   `deleteEvent(String slug)`: Удаление (ADMIN).

## 3. 🎮 Controllers

### `EventController.java`
*   `GET /api/events`: Список (Public).
*   `GET /api/events/{slug}`: Детали (Public).
*   `POST /api/events/bookings`: Бронирование (Public).
*   `POST /api/events`: Создать (Admin).
*   `PUT /api/events/{slug}`: Обновить (Admin).
*   `DELETE /api/events/{slug}`: Удалить (Admin).
