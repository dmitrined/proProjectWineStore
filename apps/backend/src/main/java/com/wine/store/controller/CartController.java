package com.wine.store.controller;

import com.wine.store.dto.ApiResponse;
import com.wine.store.dto.CartCalculationRequest;
import com.wine.store.dto.CartCalculationResponse;
import com.wine.store.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * НАЗНАЧЕНИЕ: API для расчета корзины.
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Cart", description = "Управление корзиной и расчет цен")
public class CartController {

    private final CartService cartService;

    @PostMapping("/calculate")
    @Operation(summary = "Рассчитать стоимость корзины", description = "Принимает список товаров и возвращает итоговую стоимость с учетом акций и проверкой наличия.")
    public ResponseEntity<ApiResponse<CartCalculationResponse>> calculateCart(
            @RequestBody @Valid CartCalculationRequest request) {
        log.info("POST /api/cart/calculate - items count: {}", request.items().size());
        return ResponseEntity.ok(ApiResponse.success(cartService.calculateCart(request)));
    }
}
