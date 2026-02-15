package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.util.List;

@Schema(description = "Результат расчета корзины")
public record CartCalculationResponse(
                @Schema(description = "Итоговая сумма", example = "45.98") BigDecimal totalAmount,

                @Schema(description = "Список элементов корзины с деталями") List<CartItemResponseDTO> items,

                @Schema(description = "Флаг доступности всех товаров", example = "true") boolean allAvailable) {
}
