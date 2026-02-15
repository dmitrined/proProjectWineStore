package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: DTO для ответа API (данные вина).
 * СООТВЕТСТВИЕ: Frontend интерфейс Wine.
 */
@Schema(description = "Информация о вине (совместимая с фронтенд-интерфейсом)")
public record WineResponse(
        @Schema(description = "ID (строка)", example = "1") String id,

        @Schema(description = "Название", example = "Riesling") String name,

        @Schema(description = "Slug", example = "riesling-2022") String slug,

        @Schema(description = "Цена", example = "15.99") BigDecimal price,

        @Schema(description = "Флаг скидки", example = "false") boolean sale,

        @Schema(description = "Акционная цена", example = "12.99") BigDecimal salePrice,

        @Schema(description = "Полное описание") String description,

        @Schema(description = "Изображение") String image,

        @Schema(description = "Тип", example = "WHITE") String type,

        @Schema(description = "Статус наличия", example = "IN_STOCK") String stockStatus,

        @Schema(description = "Количество на складе", example = "50") Integer stockQuantity,

        @Schema(description = "Сорт винограда", example = "Riesling") String grapeVariety,

        @Schema(description = "Год", example = "2022") Integer year,

        @Schema(description = "Алкоголь", example = "12.5%") String alcohol,

        @Schema(description = "Кислотность", example = "Medium") String acidity,

        @Schema(description = "Сахар", example = "Low") String sugar,

        @Schema(description = "Вкус", example = "TROCKEN") String flavor,

        @Schema(description = "Лимитированное издание") String edition,

        @Schema(description = "Рейтинг", example = "4.5") Double rating,

        @Schema(description = "Блюда") List<String> recommendedDishes,

        @Schema(description = "Теги") List<String> tags,

        @Schema(description = "Временное поле", hidden = true) String temp) {
}
