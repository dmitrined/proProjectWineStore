package com.wine.store;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wine.store.model.Event;
import com.wine.store.model.Wine;
import com.wine.store.repository.EventRepository;
import com.wine.store.repository.WineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Инициализация данных из JSON файлов при старте.
 * ЗАВИСИМОСТИ: ObjectMapper, Repositories.
 * ОСОБЕННОСТИ: Запускается только если таблицы пусты.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final WineRepository wineRepository;
    private final EventRepository eventRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        seedWines();
        seedEvents();
    }

    private void seedWines() {
        if (wineRepository.count() > 0) {
            log.info("Wines already exist. Skipping seeding.");
            return;
        }

        try {
            // Path relative to apps/backend root execution
            File file = new File("../../apps/frontend/lib/data/products.json");
            if (!file.exists()) {
                // Try absolute path or different relative path if running from root
                file = new File("apps/frontend/lib/data/products.json");
            }

            if (file.exists()) {
                List<Wine> wines = objectMapper.readValue(file, new TypeReference<List<Wine>>() {
                });
                wineRepository.saveAll(wines);
                log.info("Successfully seeded {} wines.", wines.size());
            } else {
                log.warn("products.json not found for seeding.");
            }
        } catch (IOException e) {
            log.error("Failed to seed wines: {}", e.getMessage());
        }
    }

    private void seedEvents() {
        if (eventRepository.count() > 0) {
            log.info("Events already exist. Skipping seeding.");
            return;
        }

        try {
            File file = new File("../../apps/frontend/lib/data/events.json");
            if (!file.exists()) {
                file = new File("apps/frontend/lib/data/events.json");
            }

            if (file.exists()) {
                List<Event> events = objectMapper.readValue(file, new TypeReference<List<Event>>() {
                });
                eventRepository.saveAll(events);
                log.info("Successfully seeded {} events.", events.size());
            } else {
                log.warn("events.json not found for seeding.");
            }
        } catch (IOException e) {
            log.error("Failed to seed events: {}", e.getMessage());
        }
    }
}
