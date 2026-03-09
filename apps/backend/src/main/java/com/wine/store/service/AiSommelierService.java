package com.wine.store.service;

import com.wine.store.dto.SommelierRequest;
import com.wine.store.dto.SommelierResponse;
import com.wine.store.mapper.WineMapper;
import com.wine.store.model.Dish;
import com.wine.store.model.Wine;
import com.wine.store.repository.WineRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * НАЗНАЧЕНИЕ: Реализация логики "Умного сомелье" с помощью Spring AI.
 */
@Service
@Slf4j
public class AiSommelierService {

    private final WineRepository wineRepository;
    private final WineMapper wineMapper;
    private final ChatClient chatClient;

    public AiSommelierService(WineRepository wineRepository, WineMapper wineMapper,
            ChatClient.Builder chatClientBuilder) {
        this.wineRepository = wineRepository;
        this.wineMapper = wineMapper;
        this.chatClient = chatClientBuilder.build();
    }

    private record AiRecommendation(Long wineId, int matchScore, String matchReasoning) {
    }

    @Transactional(readOnly = true)
    public List<SommelierResponse> recommendWines(SommelierRequest request) {
        log.info("Calculating AI recommendations for request: {}", request);

        // 1. Извлекаем данные (лучше фильтровать в БД по бюджету и наличию, но пока
        // берем все)
        List<Wine> availableWines = wineRepository.findAll();

        if (availableWines.isEmpty()) {
            return List.of();
        }

        // 2. Формируем контекст вин (Prompt Context)
        String winesContext = availableWines.stream()
                .map(w -> String.format(
                        "ID: %d, Name: %s, Type: %s, Price: %s, Features: [Acidity: %s, Sugar: %s, Flavor: %s], Dishes: %s",
                        w.getId(), w.getName(), w.getType(), w.getPrice(),
                        w.getAcidity(), w.getSugar(), w.getFlavor(),
                        w.getRecommendedDishes().stream().map(Dish::getName).toList()))
                .collect(Collectors.joining("\n"));

        // 3. Формируем Запрос к AI
        String prompt = """
                You are an expert sommelier. Recommend the top 3 best matching wines from the catalog below based on the user's request.
                Provide a score (0-100) and a very convincing, human-friendly reasoning for why this wine matches their request perfectly.

                USER REQUEST:
                Dish: {dish}
                Occasion: {occasion}
                Budget: {budget}
                Mood: {mood}

                AVAILABLE WINES:
                {wines}
                """;

        // 4. Обращение к LLM и парсинг структурированного ответа (JSON ->
        // List<AiRecommendation>)
        try {
            List<AiRecommendation> recommendations = chatClient.prompt()
                    .user(u -> u.text(prompt)
                            .param("dish", request.dish() != null ? request.dish() : "Any")
                            .param("occasion", request.occasion() != null ? request.occasion() : "Any")
                            .param("budget", request.priceRange() != null ? request.priceRange() : "Any")
                            .param("mood", request.mood() != null ? request.mood() : "Any")
                            .param("wines", winesContext))
                    .call()
                    .entity(new ParameterizedTypeReference<List<AiRecommendation>>() {
                    });

            if (recommendations == null || recommendations.isEmpty()) {
                return List.of();
            }

            // 5. Обогащаем результат до SommelierResponse
            return recommendations.stream()
                    .map(rec -> {
                        Wine wine = availableWines.stream().filter(w -> w.getId().equals(rec.wineId())).findFirst()
                                .orElse(null);
                        if (wine == null)
                            return null;

                        return SommelierResponse.builder()
                                .wine(wineMapper.toDto(wine))
                                .matchScore(rec.matchScore())
                                .matchReasoning(rec.matchReasoning())
                                .build();
                    })
                    .filter(java.util.Objects::nonNull)
                    .sorted(Comparator.comparingInt(SommelierResponse::matchScore).reversed())
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Failed to get AI recommendations: {}", e.getMessage());
            return List.of();
        }
    }
}
