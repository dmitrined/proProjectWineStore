package de.ait.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tax_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaxUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private boolean enabled;

    @Column(nullable = false, unique = true)
    private String taxNumber;

    @Column(nullable = false)
    private String fullName;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinTable(name = "tax_user_roles", joinColumns = @JoinColumn(name = "tax_user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Builder.Default
    private Set<Role> roles = new HashSet<>();


}