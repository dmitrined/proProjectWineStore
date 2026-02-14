package com.wine.store.dto;

import com.wine.store.model.StockStatus;
import com.wine.store.model.WineFlavor;
import com.wine.store.model.WineType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Полная информация о вине для API.
 */
@Data
@Builder
public class WineDTO {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String shortDescription;
    private String imageUrl;

    private BigDecimal price;
    private BigDecimal salePrice;
    private boolean isSale;

    private StockStatus stockStatus;
    private Integer stockQuantity;

    private WineType type;
    private String grapeVariety;
    private String winery;
    private String region;
    private String country;
    private Integer year;

    private String alcohol;
    private String acidity;
    private String sugar;

    private WineFlavor flavor;
    private String qualityLevel;
    private String edition;

    private Double rating;
    private List<String> recommendedDishes;
    private List<String> tags;
    private boolean featured;
}
