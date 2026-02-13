package com.wine.store.dto;

import java.math.BigDecimal;

/**
 * НАЗНАЧЕНИЕ: Параметры поиска вин.
 * СООТВЕТСТВИЕ: Frontend интерфейс FetchWinesParams.
 */
public record WineSearchRequest(
        String search,
        String category,
        String grape,
        String flavor,
        String quality,
        BigDecimal minPrice,
        BigDecimal maxPrice,
        String sort,
        String type, // Доп. поле для фильтрации по типу, если отличается от category
        String tag) {
}
