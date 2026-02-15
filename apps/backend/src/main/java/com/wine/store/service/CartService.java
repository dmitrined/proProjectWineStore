package com.wine.store.service;

import com.wine.store.dto.CartCalculationRequest;
import com.wine.store.dto.CartCalculationResponse;
import com.wine.store.dto.CartItemResponseDTO;
import com.wine.store.model.StockStatus;
import com.wine.store.model.Wine;
import com.wine.store.repository.WineRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Бизнес-логика корзины (расчет стоимости, проверка наличия).
 */
@Service
@RequiredArgsConstructor
public class CartService {

    private final WineRepository wineRepository;

    @Transactional(readOnly = true)
    public CartCalculationResponse calculateCart(CartCalculationRequest request) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<CartItemResponseDTO> responseItems = new ArrayList<>();
        boolean allAvailable = true;

        for (var itemReq : request.items()) {
            if (itemReq.productId() == null) {
                allAvailable = false;
                continue;
            }
            Wine wine = wineRepository.findById(Objects.requireNonNull(itemReq.productId())).orElse(null);

            if (wine == null) {
                // Если товар не найден, он недоступен
                responseItems.add(new CartItemResponseDTO(
                        itemReq.productId(), "Unknown Product", BigDecimal.ZERO,
                        itemReq.quantity(), BigDecimal.ZERO, StockStatus.OUT_OF_STOCK, false, null));
                allAvailable = false;
                continue;
            }

            BigDecimal price = (wine.isSale() && wine.getSalePrice() != null
                    && wine.getSalePrice().compareTo(BigDecimal.ZERO) > 0)
                            ? wine.getSalePrice()
                            : wine.getPrice();

            if (price == null) {
                price = BigDecimal.ZERO;
            }

            BigDecimal subtotal = price.multiply(BigDecimal.valueOf(itemReq.quantity()));
            totalAmount = totalAmount.add(subtotal);

            boolean isAvailable = wine.getStockStatus() == StockStatus.IN_STOCK
                    && (wine.getStockQuantity() != null && wine.getStockQuantity() >= itemReq.quantity());

            if (!isAvailable)
                allAvailable = false;

            responseItems.add(new CartItemResponseDTO(
                    wine.getId(),
                    wine.getName(),
                    price,
                    itemReq.quantity(),
                    subtotal,
                    wine.getStockStatus(),
                    isAvailable,
                    wine.getImageUrl()));
        }

        return new CartCalculationResponse(totalAmount, responseItems, allAvailable);
    }
}
