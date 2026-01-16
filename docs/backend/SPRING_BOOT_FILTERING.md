# 🏗 Архитектура Фильтрации на Spring Boot (Best Practice)

Для реализации гибкой фильтрации, аналогичной тому, что сейчас есть на фронтенде (`search`, `category`, `grape`, `price`, `flavor`), лучшим подходом в экосистеме Spring Boot и JPA является использование **JPA Specifications**.

Этот паттерн позволяет динамически "собирать" SQL-запрос на лету, добавляя условия (`WHERE`) только если пришли соответствующие параметры.

## 1. DTO (Data Transfer Object)
Сначала создаем класс, который зеркально отражает интерфейс `FetchWinesParams` с фронтенда.

```java
// dto/WineSearchRequest.java
public record WineSearchRequest(
    String search,
    String category,    // RED, WHITE, ROSE...
    String grape,       // Merlot, Riesling...
    String flavor,      // TROCKEN, FEINHERB...
    String quality,     // EDITION_C, LITERWEINE...
    BigDecimal minPrice,
    BigDecimal maxPrice,
    String sort         // price_asc, newest...
) {}
```

## 2. Entity (Модель)
Предполагаемая структура сущности (упрощенно).

```java
// entity/Wine.java
@Entity
@Table(name = "wines")
public class Wine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Enumerated(EnumType.STRING)
    private WineType type; // RED, WHITE...

    private String grapeVariety;
    
    @Enumerated(EnumType.STRING)
    private WineFlavor flavor; 

    private BigDecimal price;
    
    // ... остальные поля
}
```

## 3. Repository (Репозиторий)
Ключевой момент: наследуемся от `JpaSpecificationExecutor`.

```java
// repository/WineRepository.java
public interface WineRepository extends JpaRepository<Wine, Long>, JpaSpecificationExecutor<Wine> {
    // Методы findBy... писать не нужно, вся магия будет в Specification
}
```

## 4. Specification (Построитель запроса)
Это самый важный класс. Он преобразует DTO в SQL предикаты.

```java
// service/WineSpecification.java
public class WineSpecification {

    public static Specification<Wine> getSpec(WineSearchRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Поиск (Search) - LIKE по имени или описанию
            if (StringUtils.hasText(request.search())) {
                String pattern = "%" + request.search().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("name")), pattern),
                    cb.like(cb.lower(root.get("description")), pattern),
                    cb.like(cb.lower(root.get("grapeVariety")), pattern)
                ));
            }

            // 2. Категория (Exact Match)
            if (StringUtils.hasText(request.category())) {
                predicates.add(cb.equal(
                    root.get("type"), 
                    WineType.valueOf(request.category().toUpperCase())
                ));
            }

            // 3. Сорт винограда (Exact Match)
            if (StringUtils.hasText(request.grape())) {
                predicates.add(cb.equal(root.get("grapeVariety"), request.grape()));
            }

            // 4. Вкус (Flavor)
            if (StringUtils.hasText(request.flavor())) {
                predicates.add(cb.equal(
                    root.get("flavor"), 
                    WineFlavor.valueOf(request.flavor().toUpperCase())
                ));
            }

            // 5. Диапазон цен
            if (request.minPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), request.minPrice()));
            }
            if (request.maxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), request.maxPrice()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
```

## 5. Service & Controller
Собираем всё вместе.

```java
// controller/WineController.java
@RestController
@RequestMapping("/api/wines")
public class WineController {

    private final WineRepository wineRepository;

    // Конструктор...

    @GetMapping
    public Page<WineDTO> getWines(
            WineSearchRequest filters,
            Pageable pageable
    ) {
        // 1. Строим спецификацию
        Specification<Wine> spec = WineSpecification.getSpec(filters);
        
        // 2. Делаем запрос в БД с пагинацией и фильтрами
        Page<Wine> wines = wineRepository.findAll(spec, pageable);
        
        // 3. Маппим в DTO и возвращаем
        return wines.map(this::convertToDto);
    }
}
```

## Почему это "Best Practice"?

1.  **Производительность**: Запрос компилируется в *один* SQL SELECT. Вы не тянете лишние данные из БД.
2.  **Гибкость**: Легко добавить новый фильтр (просто добавить новый `if` в Specification).
3.  **Безопасность**: Полная защита от SQL Injection (используется Criteria API / Bind Parameters).
4.  **Пагинация**: Spring Data автоматически дописывает `LIMIT / OFFSET` и делает `COUNT` запрос для мета-данных (total pages).
