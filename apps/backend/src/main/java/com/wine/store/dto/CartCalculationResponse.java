package com.wine.store.dto;

import java.math.BigDecimal;
import java.util.List;

public record CartCalculationResponse(
        BigDecimal totalAmount,
        List<CartItemResponseDTO> items,
        boolean allAvailable) {
}
