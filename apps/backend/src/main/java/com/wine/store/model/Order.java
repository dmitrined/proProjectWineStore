package com.wine.store.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * НАЗНАЧЕНИЕ: Сущность Заказа.
 * ЗАВИСИМОСТИ: JPA, Lombok.
 */
@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    private BigDecimal totalAmount;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
