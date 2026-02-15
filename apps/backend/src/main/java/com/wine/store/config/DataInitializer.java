package com.wine.store.config;

import com.wine.store.model.*;
import com.wine.store.repository.UserRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * НАЗНАЧЕНИЕ: Инициализация первичных данных из JSON файлов.
 */
@Component
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("Starting data initialization...");

        loadUsers();
        log.info("Data initialization completed. Application is ready.");
    }

    private void loadUsers() {
        if (userRepository.count() > 0) {
            log.info("Users already initialized.");
            return;
        }

        log.info("Creating initial admin user...");
        User admin = User.builder()
                .email("admin@winestore.com")
                .password(passwordEncoder.encode("admin123"))
                .firstName("Admin")
                .lastName("User")
                .userRole(UserRole.ADMIN)
                .build();

        userRepository.save(Objects.requireNonNull(admin));
        log.info("Initial admin user created: admin@winestore.com / admin123");
    }
}
