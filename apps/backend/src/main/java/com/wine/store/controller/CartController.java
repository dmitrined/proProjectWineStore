package com.wine.store.controller;

import com.wine.store.dto.CartCalculationRequest;
import com.wine.store.dto.CartCalculationResponse;
import com.wine.store.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
public class CartController {

    private final CartService cartService;

    @PostMapping("/calculate")
    public ResponseEntity<CartCalculationResponse> calculateCart(@RequestBody @Valid CartCalculationRequest request) {
        return ResponseEntity.ok(cartService.calculateCart(request));
    }
}
