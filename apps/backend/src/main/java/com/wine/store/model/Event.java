package com.wine.store.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * НАЗНАЧЕНИЕ: Сущность мероприятия (дегустация, фестиваль).
 * ЗАВИСИМОСТИ: JPA, Lombok.
 * ОСОБЕННОСТИ: Отображается на таблицу "events".
 */
@Entity
@Table(name = "events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    @Lob
    private String description;

    private String imageUrl;

    // Дата и Время
    private LocalDate date;
    private String time;

    private String location; // "Uhlandstraße 12"

    // Бронирование
    private BigDecimal pricePerPerson;
    private Integer totalSpots;

    @Builder.Default
    private Integer bookedSpots = 0;

    @Enumerated(EnumType.STRING)
    private EventCategory category; // WEINFEST, WEINPROBE...

    public boolean isFull() {
        return bookedSpots >= totalSpots;
    }
}
