package com.wine.store.repository;

import com.wine.store.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Репозиторий для работы с бронированиями.
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerEmail(String email);
}
