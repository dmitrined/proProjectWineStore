package com.wine.store.repository;

import com.wine.store.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
