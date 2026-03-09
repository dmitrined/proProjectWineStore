package de.ait.repository;

import de.ait.model.TaxUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaxUserRepository extends JpaRepository<TaxUser, Long> {
    Optional<TaxUser> findByUsername(String username);
}