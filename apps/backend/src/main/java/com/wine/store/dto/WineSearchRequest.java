package com.wine.store.dto;

import java.math.BigDecimal;

/**
 * НАЗНАЧЕНИЕ: Параметры поиска и фильтрации вин.
 * ИСПОЛЬЗУЕТСЯ В: WineController, WineSpecification.
 */
public record WineSearchRequest(
        String search,
        String category, // RED, WHITE, ROSE...
        String type, // Alias for category
        String grape, // Spätburgunder, Riesling...
        String flavor, // TROCKEN, FEINHERB...
        String quality, // VDP.GUTSWEIN...
        String tag, // BIO, NEW...
        BigDecimal minPrice,
        BigDecimal maxPrice,
        String sort // price_asc, newest...
) {
}
