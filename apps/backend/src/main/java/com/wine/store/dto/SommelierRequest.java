package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "Запрос к AI сомелье")
public class SommelierRequest {

    @Schema(description = "Блюдо", example = "Steak")
    @NotBlank
    private String dish;

    @Schema(description = "Событие/Повод", example = "Dinner with friends")
    private String occasion;

    @Schema(description = "Бюджет", example = "under-20", allowableValues = { "under-20", "20-50", "50-plus" })
    private String priceRange;

    @Schema(description = "Настроение", example = "Relaxed")
    private String mood;
}
