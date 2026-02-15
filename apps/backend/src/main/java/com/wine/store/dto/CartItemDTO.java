package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Элемент корзины")
public record CartItemDTO(
                @Schema(description = "ID продукта (вина)", example = "1") @NotNull Long productId,

                @Schema(description = "Количество", example = "2") @NotNull @Min(1) Integer quantity) {
}
