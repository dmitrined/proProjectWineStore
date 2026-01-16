# 📅 Модуль: Events & Booking (События и Бронирование)

Модуль для управления дегустациями, фестивалями и бронированием билетов.

## 📦 Package: `com.fellbach.api.event`

## 1. 🏗 Entities

### `Event.java`
Событие или мероприятие.

```java
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String imageUrl;
    
    // Дата и Время
    private LocalDate date;
    private LocalTime time;
    
    private String location; // "Uhlandstraße 12"
    
    // Бронирование
    private BigDecimal pricePerPerson;
    private Integer totalSpots;
    private Integer bookedSpots; 
    
    @Enumerated(EnumType.STRING)
    private EventCategory category; // WEINFEST, WEINPROBE...
    
    public boolean isFull() {
        return bookedSpots >= totalSpots;
    }
}
```

### `Booking.java`
Запись о бронировании клиентом.

```java
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private String customerName;
    private String customerEmail;
    private String customerPhone;
    
    private Integer guestsCount;
    private BigDecimal totalPrice;
    
    @Enumerated(EnumType.STRING)
    private BookingStatus status; // PENDING, CONFIRMED, CANCELLED
    
    private LocalDateTime createdAt;
}
```

## 2. 🔄 DTOs

### `EventDTO.java`
Данные события + вычисляемое поле `availableSpots`.

### `BookingRequest.java`
JSON для создания брони.
```java
public record BookingRequest(
    Long eventId,
    String name,
    String email,
    Integer guests
) {}
```

## 3. ⚙️ Services

### `EventService.java`
*   `List<EventDTO> getUpcomingEvents()` — события в будущем.
*   `EventDTO getEvent(String slug)`.

### `BookingService.java`
*   `BookingResponse createBooking(BookingRequest req)` — основная транзакционная логика.
    1.  Найти событие.
    2.  Проверить места (`totalSpots - bookedSpots >= req.guests`).
    3.  Увеличить `bookedSpots` (Optimistic Locking).
    4.  Создать запись `Booking`.
    5.  Отправить email подтверждение (через EmailService).

## 4. 🎮 Controllers

### `EventController.java`
*   `GET /api/events`
*   `GET /api/events/{slug}`

### `BookingController.java`
*   `POST /api/bookings` — создание брони.
*   `GET /api/bookings/my` — просмотр своих броней (если авторизован).
