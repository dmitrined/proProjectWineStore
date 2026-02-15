package com.wine.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Ответ AI сомелье")
public class SommelierResponse {

    @Schema(description = "Рекомендованное вино")
    private WineDTO wine;

    @Schema(description = "Оценка совпадения (0-100)", example = "85")
    private int matchScore;

    @Schema(description = "Объяснение рекомендации", example = "This Red wine pairs perfectly with Steak.")
    private String matchReasoning;
}
