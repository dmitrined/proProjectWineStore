package com.wine.store.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.hibernate.annotations.UuidGenerator;

/**
 * НАЗНАЧЕНИЕ: Сущность Мероприятия.
 * ЗАВИСИМОСТИ: JPA, Lombok.
 * ОСОБЕННОСТИ: Соответствует TypeScript интерфейсу Event.
 */
@Entity
@Table(name = "events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @UuidGenerator
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    private LocalDate date;

    private String time;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer spots;

    private BigDecimal price;

    private String image;

    private String category;

    @Column(name = "is_full")
    private boolean isFull;
}
