package com.wine.store.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wine.store.model.*;
import com.wine.store.repository.EventRepository;
import com.wine.store.repository.UserRepository;
import com.wine.store.repository.WineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Инициализация первичных данных из JSON файлов.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final WineRepository wineRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    @Override
    public void run(String... args) throws Exception {
        log.info("Starting data initialization...");
        loadWines();
        loadEvents();
        loadUsers();
        log.info("Data initialization completed. Application is ready.");
    }

    private void loadWines() {
        if (wineRepository.count() > 0) {
            log.info("Wines already initialized.");
            return;
        }

        try {
            log.info("Loading wines from JSON...");
            ClassPathResource resource = new ClassPathResource("data/products.json");
            InputStream inputStream = resource.getInputStream();
            List<WineJsonDto> wineDtos = objectMapper.readValue(inputStream, new TypeReference<>() {
            });

            List<Wine> wines = (List<Wine>) wineDtos.stream().map(dto -> {
                log.debug("Mapping wine: {}", dto.getName());
                return Wine.builder()
                        .name(dto.getName())
                        .slug(dto.getSlug())
                        .description(dto.getDescription())
                        .shortDescription(dto.getShortDescription())
                        .imageUrl(dto.getImage())
                        .price(dto.getPrice())
                        .salePrice(dto.getSalePrice())
                        .isSale(dto.isSale())
                        .stockStatus(dto.getMappedStockStatus())
                        .stockQuantity(dto.getStockQuantity())
                        .type(dto.getMappedType())
                        .grapeVariety(
                                dto.getGrapeVariety() != null ? dto.getGrapeVariety() : dto.getGrapeVarietyCamel())
                        .winery(dto.getWinery())
                        .region(dto.getRegion())
                        .country(dto.getCountry())
                        .releaseYear(dto.getYear())
                        .alcohol(dto.getAlcohol())
                        .acidity(dto.getAcidity())
                        .sugar(dto.getSugar())
                        .flavor(dto.getMappedFlavor())
                        .qualityLevel(dto.getQualityLevel())
                        .edition(dto.getEdition())
                        .rating(dto.getRating())
                        .recommendedDishes(
                                dto.getRecommendedDishes() != null ? dto.getRecommendedDishes() : dto.getFoodPairing())
                        .tags(dto.getTags())
                        .featured(dto.isFeatured())
                        .build();
            }).toList();

            wineRepository.saveAll(wines);
            log.info("Successfully loaded {} wines.", wines.size());
        } catch (Exception e) {
            log.error("Failed to load wines: {}", e.getMessage(), e);
        }
    }

    private void loadEvents() {
        if (eventRepository.count() > 0) {
            log.info("Events already initialized.");
            return;
        }

        try {
            log.info("Loading events from JSON...");
            ClassPathResource resource = new ClassPathResource("data/events.json");
            InputStream inputStream = resource.getInputStream();
            List<EventJsonDto> eventDtos = objectMapper.readValue(inputStream, new TypeReference<>() {
            });

            List<Event> events = eventDtos.stream().map(dto -> {
                log.debug("Mapping event: {}", dto.getTitle());
                return Event.builder()
                        .title(dto.getTitle())
                        .slug(dto.getSlug())
                        .description(dto.getDescription())
                        .imageUrl(dto.getImage())
                        .date(LocalDate.parse(dto.getDate(), DATE_FORMATTER))
                        .time(dto.getTime())
                        .location(dto.getLocation())
                        .pricePerPerson(dto.getPrice())
                        .totalSpots(dto.getTotalSpots())
                        .bookedSpots(dto.getBookedSpots())
                        .category(dto.getMappedCategory())
                        .build();
            }).toList();

            eventRepository.saveAll(events);
            log.info("Successfully loaded {} events.", events.size());
        } catch (Exception e) {
            log.error("Failed to load events: {}", e.getMessage(), e);
        }
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

        userRepository.save(admin);
        log.info("Initial admin user created: admin@winestore.com / admin123");
    }
}
