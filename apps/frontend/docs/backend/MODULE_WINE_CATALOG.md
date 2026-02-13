# 🍷 Модуль: Wine Catalog (Каталог Вин)

Этот модуль отвечает за управление ассортиментом вин, фильтрацию и поиск.

## 📦 Package: `com.fellbach.api.wine`

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
    @Column(columnDefinition = "TEXT")
    private String shortDescription;

    private String imageUrl;

    // Цена и Наличие
    private BigDecimal price;
    private BigDecimal salePrice;
    private boolean isSale;
    
    @Enumerated(EnumType.STRING)
    private StockStatus stockStatus; // INSTOCK, OUTOFSTOCK
    private Integer stockQuantity;

    // Характеристики
    @Enumerated(EnumType.STRING)
    private WineType type; // RED, WHITE, ROSE, SPARKLING...
    
    private String grapeVariety; // Spätburgunder
    private Integer year;
    
    // Технические данные
    private String alcohol; // 13.5%
    private String acidity; // 5.6 g/l
    private String sugar;   // 2.0 g/l
    
    @Enumerated(EnumType.STRING)
    private WineFlavor flavor; // TROCKEN, FEINHERB...
    
    private String qualityLevel; // VDP.GUTSWEIN
    private String edition;      // Edition C

    // AI & Meta
    private Double rating;
    
    @ElementCollection
    private List<String> recommendedDishes; // ["Steak", "Pasta"]
    
    @ElementCollection
    private List<String> tags; // ["Bio", "New"]
}
```

### Enums
*   `WineType`: `RED`, `WHITE`, `ROSE`, `SPARKLING`, `ALCOHOL_FREE`, `PACKAGE`, `OTHER`
*   `WineFlavor`: `TROCKEN`, `HALBTROCKEN`, `FEINHERB`, `LIEBLICH`, `SUESS`
*   `StockStatus`: `IN_STOCK`, `OUT_OF_STOCK`, `ON_DEMAND`

## 2. 🔄 DTOs (Data Transfer Objects)

### `WineDTO.java`
Полная проекция вина для отправки на клиент.
*   Поля идентичны `Wine` entity, но без тяжелых связей (если будут).

### `WinePreviewDTO.java`
Облегченная версия для списков (без полного описания и характеристик).
*   `id`, `name`, `slug`, `price`, `imageUrl`, `type`, `grapeVariety`.

### `WineSearchRequest.java`
Параметры фильтрации (см. `SPRING_BOOT_FILTERING.md`).

## 3. 🗄 Repositories

### `WineRepository.java`
```java
public interface WineRepository extends JpaRepository<Wine, Long>, JpaSpecificationExecutor<Wine> {
    Optional<Wine> findBySlug(String slug);
    List<Wine> findTop10ByOrderByCreatedAtDesc(); // New arrivals
}
```

## 4. ⚙️ Services

### `WineService.java`
Бизнес-логика каталога.

*   `Page<WineDTO> getAllWines(WineSearchRequest request, Pageable pageable)` — основной метод каталога.
*   `WineDTO getWineBySlug(String slug)` — для детальной страницы.
*   `List<WineDTO> getRelatedWines(Long wineId)` — похожие товары (простая логика: тот же сорт/тип).
*   `List<String> getAllGrapes()` — для заполнения фильтров в сайдбаре.

## 5. 🎮 Controllers

### `WineController.java`
REST API эндпоинты.

*   `GET /api/wines` — возвращает Page<WineDTO>
*   `GET /api/wines/{slug}` — возвращает WineDTO
*   `GET /api/wines/filters/facets` — возвращает доступные варианты (уникальные сорта, вкусы) для UI фильтров.
