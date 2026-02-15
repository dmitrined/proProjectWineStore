package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

/**
 * НАЗНАЧЕНИЕ: Параметры поиска и фильтрации вин.
 * ИСПОЛЬЗУЕТСЯ В: WineController, WineSpecification.
 */
@Schema(description = "Параметры поиска и фильтрации вин")
public record WineSearchRequest(
        @Size(max = 100) @Schema(description = "Поисковый запрос (по названию)", example = "Riesling") String search,

        @Schema(description = "Категория вина (RED, WHITE, ROSE, SPARKLING)", example = "WHITE") String category,

        @Schema(description = "Тип (псевдоним для категории)", example = "WHITE") String type,

        @Schema(description = "Сорт винограда", example = "Riesling") String grape,

        @Schema(description = "Вкус (сладость)", example = "TROCKEN") String flavor,

        @Schema(description = "Уровень качества", example = "VDP.GUTSWEIN") String quality,

        @Schema(description = "Тег", example = "BIO") String tag,

        @DecimalMin("0.0") @Schema(description = "Минимальная цена", example = "10.00") BigDecimal minPrice,

        @DecimalMin("0.0") @Schema(description = "Максимальная цена", example = "100.00") BigDecimal maxPrice,

        @Schema(description = "Сортировка (price_asc, price_desc, newest, rating)", example = "price_asc") String sort) {
}
