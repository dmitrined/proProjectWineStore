package com.wine.store.repository;

import com.wine.store.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * НАЗНАЧЕНИЕ: Репозиторий для работы с мероприятиями.
 * ЗАВИСИМОСТИ: Spring Data JPA.
 */
@Repository
public interface EventRepository extends JpaRepository<Event, String> {
}
