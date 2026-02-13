package com.wine.store.repository;

import com.wine.store.model.Wine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * НАЗНАЧЕНИЕ: Репозиторий для работы с винами.
 * ЗАВИСИМОСТИ: Spring Data JPA.
 */
@Repository
public interface WineRepository
        extends JpaRepository<Wine, String>, org.springframework.data.jpa.repository.JpaSpecificationExecutor<Wine> {
    Page<Wine> findByType(String type, Pageable pageable);
    // Add more query methods as needed for filtering
}
