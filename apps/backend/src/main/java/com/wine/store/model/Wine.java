package com.wine.store.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Сущность вина в каталоге.
 * ЗАВИСИМОСТИ: JPA, Lombok.
 * ОСОБЕННОСТИ: Отображается на таблицу "wines".
 */
@Entity
@Table(name = "wines")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Wine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Основная информация
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug; // Для SEO URL

    @Column(columnDefinition = "TEXT")
    @Lob
    private String description;

    private String imageUrl;

    // Цена и Наличие
    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal salePrice;
    private boolean isSale;

    @Enumerated(EnumType.STRING)
    private StockStatus stockStatus; // IN_STOCK, OUT_OF_STOCK

    private Integer stockQuantity;

    // Характеристики
    @Enumerated(EnumType.STRING)
    private WineType type; // RED, WHITE, ROSE, SPARKLING...

    private String grapeVariety; // Spätburgunder

    @Column(name = "release_year")
    private Integer releaseYear;

    // Технические данные
    private String alcohol; // 13.5%
    private String acidity; // 5.6 g/l
    private String sugar; // 2.0 g/l

    @Enumerated(EnumType.STRING)
    private WineFlavor flavor; // TROCKEN, FEINHERB...

    private String edition; // Edition C...

    // AI & Meta
    private Double rating;

    @ElementCollection
    @CollectionTable(name = "wine_dishes", joinColumns = @JoinColumn(name = "wine_id"))
    @Column(name = "dish")
    private List<String> recommendedDishes; // ["Steak", "Pasta"]

    @ElementCollection
    @CollectionTable(name = "wine_tags", joinColumns = @JoinColumn(name = "wine_id"))
    @Column(name = "tag")
    private List<String> tags;

    private boolean featured;

}
