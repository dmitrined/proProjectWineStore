package com.wine.store.repository;

import com.wine.store.model.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * НАЗНАЧЕНИЕ: Репозиторий для работы с винами.
 * ОСОБЕННОСТИ: Поддерживает JpaSpecificationExecutor для фильтрации.
 */
@Repository
public interface WineRepository extends JpaRepository<Wine, Long>, JpaSpecificationExecutor<Wine> {
    Optional<Wine> findBySlug(String slug);

    List<Wine> findTop10ByOrderByIdDesc(); // New arrivals (mocked by ID desc)

    @Query("SELECT DISTINCT w.grapeVariety FROM Wine w WHERE w.grapeVariety IS NOT NULL")
    List<String> findAllGrapeVarieties();
}
