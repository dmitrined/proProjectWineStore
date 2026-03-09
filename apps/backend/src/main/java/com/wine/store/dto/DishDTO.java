package com.wine.store.dto;

import com.wine.store.model.DishCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "Информация о блюде для гастропар")
public record DishDTO(
        @Schema(description = "Уникальный идентификатор блюда", example = "1") Long id,

        @Schema(description = "Название блюда", example = "Стейк из говядины") String name,

        @Schema(description = "Категория блюда", example = "MEAT") DishCategory category) {
}
