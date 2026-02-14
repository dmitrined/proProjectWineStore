package com.wine.store.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wine.store.model.Event;
import com.wine.store.model.Wine;
import com.wine.store.repository.EventRepository;
import com.wine.store.repository.WineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.LocalDate;
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
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        loadWines();
        loadEvents();
    }

    private void loadWines() {
        if (wineRepository.count() > 0) {
            log.info("Wines already initialized.");
            return;
        }

        try {
            ClassPathResource resource = new ClassPathResource("data/products.json");
            InputStream inputStream = resource.getInputStream();
            List<WineJsonDto> wineDtos = objectMapper.readValue(inputStream, new TypeReference<>() {
            });

            List<Wine> wines = wineDtos.stream().map(dto -> Wine.builder()
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
                    .grapeVariety(dto.getGrapeVariety())
                    .releaseYear(dto.getYear())
                    .alcohol(dto.getAlcohol())
                    .acidity(dto.getAcidity())
                    .sugar(dto.getSugar())
                    .flavor(dto.getMappedFlavor())
                    .qualityLevel(dto.getQualityLevel())
                    .edition(dto.getEdition())
                    .rating(dto.getRating())
                    .recommendedDishes(dto.getFoodPairing())
                    .tags(dto.getTags())
                    .build()).toList();

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
            ClassPathResource resource = new ClassPathResource("data/events.json");
            InputStream inputStream = resource.getInputStream();
            List<EventJsonDto> eventDtos = objectMapper.readValue(inputStream, new TypeReference<>() {
            });

            List<Event> events = eventDtos.stream().map(dto -> Event.builder()
                    .title(dto.getTitle())
                    .slug(dto.getSlug())
                    .description(dto.getDescription())
                    .imageUrl(dto.getImage())
                    .date(LocalDate.parse(dto.getDate()))
                    .time(dto.getTime())
                    .location(dto.getLocation())
                    .pricePerPerson(dto.getPrice())
                    .totalSpots(dto.getTotalSpots())
                    .bookedSpots(dto.getBookedSpots())
                    .category(dto.getMappedCategory())
                    .build()).toList();

            eventRepository.saveAll(events);
            log.info("Successfully loaded {} events.", events.size());
        } catch (Exception e) {
            log.error("Failed to load events: {}", e.getMessage(), e);
        }
    }
}
