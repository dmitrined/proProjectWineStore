package com.wine.store.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * НАЗНАЧЕНИЕ: Запрос на бронирование.
 */
public record BookingRequest(
        @NotNull Long eventId,
        @NotBlank String name,
        @NotBlank @Email String email,
        String phone,
        @Min(1) Integer guests) {
}
