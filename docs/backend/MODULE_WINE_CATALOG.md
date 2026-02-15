# 🍷 Модуль: Wine Catalog (Каталог Вин)

Этот модуль отвечает за управление ассортиментом вин, фильтрацию и поиск.

## 📦 Package: `com.wine.store`

## 1. 🏗 Entities (Сущности)

### `Wine.java`
Основная сущность, отображающая таблицу `wines`.

```java
@Entity
@Table(name = "wines")
public class Wine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Основная информация
    private String name;
    private String slug; // Для SEO URL (pinot-noir-2022)
    
    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    // Цена и Наличие
    private BigDecimal price;
    private BigDecimal salePrice;
    private boolean isSale;
    
    @Enumerated(EnumType.STRING)
    private StockStatus stockStatus; // IN_STOCK, OUT_OF_STOCK
    private Integer stockQuantity;

    // Характеристики
    @Enumerated(EnumType.STRING)
    private WineType type; // RED, WHITE, ROSE, SPARKLING, ALCOHOL_FREE, PACKAGE, OTHER
    
    private String grapeVariety; // Spätburgunder
    
    @Column(name = "release_year")
    private Integer releaseYear; // 2022
    
    // Технические данные
    private String alcohol; // 13.5%
    private String acidity; // 5.6 g/l
    private String sugar;   // 2.0 g/l
    
    @Enumerated(EnumType.STRING)
    private WineFlavor flavor; // TROCKEN, FEINHERB...
    
    private String edition;      // Edition C
    
    // AI & Meta
    private Double rating;
    private boolean featured;
    
    @ElementCollection
    private List<String> recommendedDishes; // ["Steak", "Pasta"]
    
    @ElementCollection
    private List<String> tags; // ["Bio", "New"]
}
```

### Enums
*   `WineType`: `RED`, `WHITE`, `ROSE`, `SPARKLING`, `ALCOHOL_FREE`, `PACKAGE`, `OTHER`
*   `WineFlavor`: `TROCKEN`, `HALBTROCKEN`, `FEINHERB`, `LIEBLICH`, `SUESS`
*   `StockStatus`: `IN_STOCK`, `OUT_OF_STOCK`

## 2. 🔄 DTOs (Data Transfer Objects)

### `WineDTO.java`
Полная проекция вина для отправки на клиент.
*   Поля идентичны `Wine` entity.

## 3. 🗄 Repositories

### `WineRepository.java`
```java
public interface WineRepository extends JpaRepository<Wine, Long>, JpaSpecificationExecutor<Wine> {
    Optional<Wine> findBySlug(String slug);
    // Dynamic filtering via Specifications
}
```

## 4. ⚙️ Services

### `WineService.java`
Бизнес-логика каталога.

*   `Page<WineDTO> getAllWines(WineSearchRequest request, Pageable pageable)` — получение вин с фильтрацией.
*   `WineDTO getWineBySlug(String slug)` — детальная страница.
*   `WineDTO createWine(WineDTO dto)` — создание (ADMIN).
*   `WineDTO updateWine(String slug, WineDTO dto)` — обновление (ADMIN).
*   `void deleteWine(String slug)` — удаление (ADMIN).

## 5. 🎮 Controllers

### `WineController.java`
REST API эндпоинты.

*   `GET /api/wines` — список вин (Public)
*   `GET /api/wines/{slug}` — детали (Public)
*   `POST /api/wines` — создать (Admin)
*   `PUT /api/wines/{slug}` — обновить (Admin)
*   `DELETE /api/wines/{slug}` — удалить (Admin)
