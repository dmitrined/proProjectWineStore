package de.ait.utils;

import de.ait.model.Role;
import de.ait.model.TaxUser;
import de.ait.repository.TaxUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@Slf4j
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final TaxUserRepository taxUserRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (taxUserRepository.count() > 0) {
            log.info("Database already initialized");
            return;
        }

        log.info("Initializing database");
        Role citizenRole = Role.builder().name("ROLE_CITIZEN").build();
        Role inspectorRole = Role.builder().name("ROLE_INSPECTOR").build();
        Role adminRole = Role.builder().name("ROLE_ADMIN").build();

        TaxUser citizen = TaxUser.builder()
                .username("Alex")
                .passwordHash(passwordEncoder.encode("alex123"))
                .taxNumber("123456")
                .fullName("Alex Citizen")
                .roles(Set.of(citizenRole))
                .build();

        TaxUser inspector = TaxUser.builder()
                .username("Tatiana")
                .passwordHash(passwordEncoder.encode("tatiana123"))
                .taxNumber("7890123")
                .fullName("Tatiana Inspector")
                .roles(Set.of(inspectorRole))
                .build();

        TaxUser admin = TaxUser.builder()
                .username("admin")
                .passwordHash(passwordEncoder.encode("admin123"))
                .taxNumber("11223344")
                .fullName("Admin Admin")
                .roles(Set.of(adminRole))
                .build();

        taxUserRepository.save(citizen);
        taxUserRepository.save(inspector);
        taxUserRepository.save(admin);

        log.info("Database initialized successfully");
    }
}