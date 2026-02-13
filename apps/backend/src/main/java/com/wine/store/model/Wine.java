package com.wine.store.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Сущность Вина для хранения в БД.
 * ЗАВИСИМОСТИ: JPA, Lombok.
 * ОСОБЕННОСТИ: Соответствует TypeScript интерфейсу Wine.
 */
@Entity
@Table(name = "wines")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Wine {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private BigDecimal price;

    private boolean sale;

    @Column(name = "sale_price")
    private BigDecimal salePrice;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    private String image;

    @Column(nullable = false)
    private String type; // red, white, etc.

    @Column(name = "stock_status")
    private String stockStatus;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "grape_variety")
    private String grapeVariety;

    @Column(name = "production_year")
    private Integer year;

    private String alcohol;
    private String acidity;
    private String sugar;
    private String flavor;

    @Column(name = "quality_level")
    private String qualityLevel;

    private String edition;

    private Double rating;

    @ElementCollection
    @CollectionTable(name = "wine_dishes", joinColumns = @JoinColumn(name = "wine_id"))
    @Column(name = "dish")
    private List<String> recommendedDishes;

    @ElementCollection
    @CollectionTable(name = "wine_tags", joinColumns = @JoinColumn(name = "wine_id"))
    @Column(name = "tag")
    private List<String> tags;

    private String temp;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
