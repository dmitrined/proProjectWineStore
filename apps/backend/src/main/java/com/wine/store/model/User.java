package com.wine.store.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

/**
 * НАЗНАЧЕНИЕ: Сущность Пользователя.
 * ЗАВИСИМОСТИ: JPA, Lombok.
 */
@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    private String firstName;
    private String lastName;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;
}
