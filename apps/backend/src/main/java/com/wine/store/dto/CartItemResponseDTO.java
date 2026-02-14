package com.wine.store.dto;

import com.wine.store.model.StockStatus;
import java.math.BigDecimal;

public record CartItemResponseDTO(
        Long productId,
        String name,
        BigDecimal unitPrice,
        Integer quantity,
        BigDecimal subtotal,
        StockStatus stockStatus,
        boolean available,
        String imageUrl) {
}
