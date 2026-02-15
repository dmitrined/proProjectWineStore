package com.wine.store.dto;

import com.wine.store.model.EventCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * НАЗНАЧЕНИЕ: Информация о событии для API.
 */
@Data
@Builder
@Schema(description = "Информация о событии (дегустации, фестивали)")
public class EventDTO {
    @Schema(description = "Уникальный идентификатор", example = "1")
    private Long id;

    @Schema(description = "Заголовок события", example = "Большая дегустация рислингов")
    private String title;

    @Schema(description = "URL-дружественный идентификатор", example = "riesling-tasting-2026")
    private String slug;

    @Schema(description = "Описание события", example = "Присоединяйтесь к нам для исследования лучших рислингов Германии.")
    private String description;

    @Schema(description = "URL изображения", example = "https://example.com/images/event.jpg")
    private String imageUrl;

    @Schema(description = "Дата проведения", example = "2026-06-15")
    private LocalDate date;

    @Schema(description = "Время проведения", example = "18:00")
    private String time;

    @Schema(description = "Место проведения", example = "WeinStore Berlin, Uhlandstraße 12")
    private String location;

    @Schema(description = "Цена за человека", example = "45.00")
    private BigDecimal pricePerPerson;

    @Schema(description = "Общее количество мест", example = "20")
    private Integer totalSpots;

    @Schema(description = "Забронировано мест", example = "5")
    private Integer bookedSpots;

    @Schema(description = "Флаг полной загрузки", example = "false")
    private boolean isFull;

    @Schema(description = "Категория события", example = "WEINPROBE")
    private EventCategory category;
}
