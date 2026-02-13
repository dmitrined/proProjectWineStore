package com.wine.store.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: DTO для ответа API (данные вина).
 * СООТВЕТСТВИЕ: Frontend интерфейс Wine.
 */
public record WineResponse(
        String id,
        String name,
        String slug,
        BigDecimal price,
        boolean sale,
        BigDecimal salePrice,
        String description,
        String shortDescription,
        String image,
        String type,
        String stockStatus,
        Integer stockQuantity,
        String grapeVariety,
        Integer year,
        String alcohol,
        String acidity,
        String sugar,
        String flavor,
        String qualityLevel,
        String edition,
        Double rating,
        List<String> recommendedDishes,
        List<String> tags,
        String temp) {
}
