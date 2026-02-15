package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * НАЗНАЧЕНИЕ: Запрос на бронирование.
 */
@Schema(description = "Запрос на бронирование места на событие")
public record BookingRequest(
                @Schema(description = "ID события", example = "1") @NotNull Long eventId,

                @Schema(description = "Имя гостя", example = "Иван Иванов") @NotBlank String name,

                @Schema(description = "Email гостя", example = "ivan@example.com") @NotBlank @Email String email,

                @Schema(description = "Телефон для связи", example = "+7(900)123-44-55") String phone,

                @Schema(description = "Количество гостей", example = "2") @Min(1) Integer guests) {
}
