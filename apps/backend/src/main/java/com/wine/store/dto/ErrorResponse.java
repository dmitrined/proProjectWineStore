package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Стандартный ответ при ошибке")
public class ErrorResponse {
    @Schema(description = "HTTP статус", example = "404")
    private int status;

    @Schema(description = "Код ошибки", example = "Not Found")
    private String error;

    @Schema(description = "Описание ошибки", example = "Resource not found")
    private String message;

    @Schema(description = "Путь запроса", example = "/api/wines/unknown")
    private String path;

    @Builder.Default
    @Schema(description = "Метка времени")
    private LocalDateTime timestamp = LocalDateTime.now();
}
