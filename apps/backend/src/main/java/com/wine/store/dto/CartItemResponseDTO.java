package com.wine.store.dto;

import com.wine.store.model.StockStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;

@Schema(description = "Детальная информация о товаре в корзине")
public record CartItemResponseDTO(
                @Schema(description = "ID продукта", example = "1") Long productId,

                @Schema(description = "Название продукта", example = "Riesling") String name,

                @Schema(description = "Цена за единицу", example = "15.99") BigDecimal unitPrice,

                @Schema(description = "Количество", example = "2") Integer quantity,

                @Schema(description = "Подитог", example = "31.98") BigDecimal subtotal,

                @Schema(description = "Статус наличия", example = "IN_STOCK") StockStatus stockStatus,

                @Schema(description = "Доступен ли товар", example = "true") boolean available,

                @Schema(description = "URL изображения", example = "/images/wine.jpg") String imageUrl) {
}
