package com.wine.store.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record CartCalculationRequest(
        @NotEmpty @Valid List<CartItemDTO> items) {
}
