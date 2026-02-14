package com.wine.store.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.wine.store.model.StockStatus;
import com.wine.store.model.WineFlavor;
import com.wine.store.model.WineType;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Вспомогательный класс для маппинга JSON данных о вине.
 */
@Data
public class WineJsonDto {
    private String id; // string in json
    private String name;
    private String slug;
    private String description;
    @JsonProperty("short_description")
    private String shortDescription;
    private String image;
    private BigDecimal price;
    @JsonProperty("sale_price")
    private BigDecimal salePrice;
    @JsonProperty("is_sale")
    private boolean isSale;
    @JsonProperty("stock_status")
    private String stockStatus;
    @JsonProperty("stock_quantity")
    private Integer stockQuantity;
    private String type;
    @JsonProperty("grape_variety")
    private String grapeVariety;
    private Integer year;
    private String alcohol;
    private String acidity;
    private String sugar;
    private String flavor;
    @JsonProperty("quality_level")
    private String qualityLevel;
    private String edition;
    private Double rating;
    @JsonProperty("food_pairing")
    private List<String> foodPairing;
    private List<String> tags;

    public StockStatus getMappedStockStatus() {
        if (stockStatus == null)
            return StockStatus.OUT_OF_STOCK;
        return switch (stockStatus.toUpperCase()) {
            case "IN_STOCK" -> StockStatus.IN_STOCK;
            case "ON_DEMAND" -> StockStatus.ON_DEMAND;
            default -> StockStatus.OUT_OF_STOCK;
        };
    }

    public WineType getMappedType() {
        if (type == null)
            return WineType.OTHER;
        try {
            return WineType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            return WineType.OTHER;
        }
    }

    public WineFlavor getMappedFlavor() {
        if (flavor == null)
            return null;
        try {
            return WineFlavor.valueOf(flavor.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
