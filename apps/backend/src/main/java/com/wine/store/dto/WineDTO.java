package com.wine.store.dto;

import com.wine.store.model.StockStatus;
import com.wine.store.model.WineFlavor;
import com.wine.store.model.WineType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Полная информация о вине для API.
 */
@Data
@Builder
@Schema(description = "Полная информация о вине")
public class WineDTO {
    @Schema(description = "Уникальный идентификатор", example = "1")
    private Long id;

    @NotBlank(message = "Название вина обязательно")
    @Size(min = 2, max = 255)
    @Schema(description = "Название вина", example = "Riesling Trocken 2022")
    private String name;

    @NotBlank(message = "Slug обязателен")
    @Schema(description = "URL-дружественный идентификатор", example = "riesling-trocken-2022")
    private String slug;

    @NotBlank(message = "Описание вина обязательно")
    @Schema(description = "Полное описание вина", example = "Этот Riesling Trocken 2022 года происходит из лучших виноградников...")
    private String description;

    @Schema(description = "URL изображения", example = "https://example.com/images/wine.jpg")
    private String imageUrl;

    @NotNull(message = "Цена обязательна")
    @DecimalMin(value = "0.0", inclusive = false)
    @Schema(description = "Базовая цена", example = "15.99")
    private BigDecimal price;

    @DecimalMin(value = "0.0")
    @Schema(description = "Акционная цена", example = "12.99")
    private BigDecimal salePrice;

    @Schema(description = "Флаг наличия скидки", example = "false")
    private boolean isSale;

    @NotNull(message = "Статус наличия обязателен")
    @Schema(description = "Статус наличия на складе", example = "IN_STOCK")
    private StockStatus stockStatus;

    @Min(0)
    @Schema(description = "Количество на складе", example = "50")
    private Integer stockQuantity;

    @NotNull(message = "Тип вина обязателен")
    @Schema(description = "Тип вина (RED, WHITE, ROSE, SPARKLING)", example = "WHITE")
    private WineType type;

    @Schema(description = "Сорт винограда", example = "Riesling")
    private String grapeVariety;

    @Min(1900)
    @Max(2100)
    @Schema(description = "Год урожая", example = "2022")
    private Integer year;

    @Schema(description = "Содержание алкоголя", example = "12.5%")
    private String alcohol;

    @Schema(description = "Кислотность", example = "High")
    private String acidity;

    @Schema(description = "Сахар", example = "Low")
    private String sugar;

    @Schema(description = "Вкус (сладость)", example = "TROCKEN")
    private WineFlavor flavor;

    @Schema(description = "Лимитированное издание", example = "Limited Edition 2022")
    private String edition;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "5.0")
    @Schema(description = "Рейтинг вина", example = "4.8")
    private Double rating;

    @Schema(description = "Рекомендуемые блюда")
    private List<String> recommendedDishes;

    @Schema(description = "Теги", example = "[\"fresh\", \"mineral\"]")
    private List<String> tags;

    @Schema(description = "Флаг популярного товара", example = "true")
    private boolean featured;
}
