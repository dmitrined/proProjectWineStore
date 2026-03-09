package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "Ответ AI сомелье")
public record SommelierResponse(
        @Schema(description = "Рекомендованное вино") WineDTO wine,

        @Schema(description = "Оценка совпадения (0-100)", example = "85") int matchScore,

        @Schema(description = "Объяснение рекомендации", example = "This Red wine pairs perfectly with Steak.") String matchReasoning) {
}
