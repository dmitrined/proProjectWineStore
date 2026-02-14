package com.wine.store.repository;

import com.wine.store.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * НАЗНАЧЕНИЕ: Репозиторий для работы с мероприятиями.
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findBySlug(String slug);

    List<Event> findByDateAfterOrderByDateAsc(LocalDate date);

    @Modifying
    @Query("UPDATE Event e SET e.bookedSpots = e.bookedSpots + :requestedSpots " +
            "WHERE e.id = :eventId AND (e.bookedSpots + :requestedSpots) <= e.totalSpots")
    int incrementBookedSpots(Long eventId, int requestedSpots);
}
