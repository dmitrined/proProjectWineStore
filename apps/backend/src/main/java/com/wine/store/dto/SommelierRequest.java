package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
@Schema(description = "Запрос к AI сомелье")
public record SommelierRequest(
        @Schema(description = "Блюдо", example = "Steak") @NotBlank String dish,

        @Schema(description = "Событие/Повод", example = "Dinner with friends") String occasion,

        @Schema(description = "Бюджет", example = "under-20", allowableValues = {
                "under-20", "20-50", "50-plus" }) String priceRange,

        @Schema(description = "Настроение", example = "Relaxed") String mood) {
}
