package com.wine.store.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.wine.store.model.EventCategory;
import lombok.Data;

import java.math.BigDecimal;

/**
 * НАЗНАЧЕНИЕ: Вспомогательный класс для маппинга JSON данных о событиях.
 */
@Data
public class EventJsonDto {
    private String id;
    private String title;
    private String slug;
    private String description;
    private String image;
    private String date; // ISO date string
    private String time; // HH:mm
    private String location;
    private BigDecimal price;
    @JsonProperty("total_spots")
    private Integer totalSpots;
    @JsonProperty("booked_spots")
    private Integer bookedSpots;
    private String category;

    public EventCategory getMappedCategory() {
        if (category == null)
            return EventCategory.OTHER;
        try {
            return EventCategory.valueOf(category.toUpperCase());
        } catch (IllegalArgumentException e) {
            return EventCategory.OTHER;
        }
    }
}
