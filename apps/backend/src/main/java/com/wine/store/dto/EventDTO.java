package com.wine.store.dto;

import com.wine.store.model.EventCategory;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * НАЗНАЧЕНИЕ: Информация о событии для API.
 */
@Data
@Builder
public class EventDTO {
    private Long id;
    private String title;
    private String slug;
    private String description;
    private String imageUrl;

    private LocalDate date;
    private String time;
    private String location;

    private BigDecimal pricePerPerson;
    private Integer totalSpots;
    private Integer bookedSpots;
    private boolean isFull;

    private EventCategory category;
}
