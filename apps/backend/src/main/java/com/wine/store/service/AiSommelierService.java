package com.wine.store.service;

import com.wine.store.dto.SommelierRequest;
import com.wine.store.dto.SommelierResponse;
import com.wine.store.mapper.WineMapper;
import com.wine.store.model.Wine;
import com.wine.store.model.WineType;
import com.wine.store.repository.WineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * НАЗНАЧЕНИЕ: Реализация логики "Умного сомелье" на основе алгоритма Match
 * Score.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AiSommelierService {

    private final WineRepository wineRepository;
    private final WineMapper wineMapper;

    // Простая база знаний: Блюдо -> Подходящие типы вин
    private static final Map<String, List<WineType>> PAIRING_RULES = new HashMap<>();

    static {
        // Мясо
        PAIRING_RULES.put("Steak", List.of(WineType.RED));
        PAIRING_RULES.put("Beef", List.of(WineType.RED));
        PAIRING_RULES.put("Lamb", List.of(WineType.RED));

        // Рыба и Морепродукты
        PAIRING_RULES.put("Fish", List.of(WineType.WHITE, WineType.SPARKLING, WineType.ROSE));
        PAIRING_RULES.put("Seafood", List.of(WineType.WHITE, WineType.SPARKLING));
        PAIRING_RULES.put("Sushi", List.of(WineType.WHITE, WineType.SPARKLING));

        // Птица
        PAIRING_RULES.put("Chicken", List.of(WineType.WHITE, WineType.ROSE, WineType.RED));
        PAIRING_RULES.put("Duck", List.of(WineType.RED, WineType.ROSE));

        // Паста и Пицца
        PAIRING_RULES.put("Pasta", List.of(WineType.RED, WineType.WHITE)); // Зависит от соуса, но упрощаем
        PAIRING_RULES.put("Pizza", List.of(WineType.RED, WineType.ROSE));

        // Сыр
        PAIRING_RULES.put("Cheese", List.of(WineType.RED, WineType.WHITE));

        // Десерты
        PAIRING_RULES.put("Dessert", List.of(WineType.WHITE, WineType.SPARKLING));
        PAIRING_RULES.put("Cake", List.of(WineType.WHITE, WineType.SPARKLING));
    }

    @Transactional(readOnly = true)
    public List<SommelierResponse> recommendWines(SommelierRequest request) {
        log.info("Calculating recommendations for request: {}", request);
        List<Wine> allWines = wineRepository.findAll();

        return allWines.stream()
                .map(wine -> calculateMatch(wine, request))
                .filter(response -> response.getMatchScore() > 0) // Отсеиваем совсем неподходящие (опционально)
                .sorted(Comparator.comparingInt(SommelierResponse::getMatchScore).reversed())
                .limit(3)
                .collect(Collectors.toList());
    }

    private SommelierResponse calculateMatch(Wine wine, SommelierRequest request) {
        int score = 0;
        List<String> reasoning = new ArrayList<>();

        // 1. Совпадение по блюду (Самый сильный сигнал)
        if (request.getDish() != null && !request.getDish().isEmpty()) {
            // Прямое совпадение в рекомендованных блюдах вина
            boolean dishDirectMatch = wine.getRecommendedDishes().stream()
                    .anyMatch(d -> d.equalsIgnoreCase(request.getDish())
                            || d.toLowerCase().contains(request.getDish().toLowerCase()));

            if (dishDirectMatch) {
                score += 50;
                reasoning.add("Perfect for " + request.getDish());
            }

            // Эвристическое совпадение по типу вина
            List<WineType> preferredTypes = getPreferredTypesForDish(request.getDish());
            if (preferredTypes.contains(wine.getType())) {
                score += 30;
                reasoning.add("Good type match for " + request.getDish());
            }
        }

        // 2. Бюджет
        if (request.getPriceRange() != null) {
            if (isPriceMatch(wine.getPrice(), request.getPriceRange())) {
                score += 20;
                reasoning.add("Fits your budget");
            }
        }

        // 3. Бонус за популярность/рейтинг
        if (wine.isFeatured()) {
            score += 5;
        }
        if (wine.getRating() != null) {
            score += (int) (wine.getRating() * 2); // Рейтинг 4.5 -> +9 баллов
        }

        // 4. Настроение (пока заглушка, можно расширить по Flavor)
        if (request.getMood() != null && !request.getMood().isEmpty()) {
            // Пример: "Relaxed" -> Boost lower alcohol?
        }

        String finalReasoning = reasoning.isEmpty() ? "General recommendation" : String.join(". ", reasoning) + ".";

        return SommelierResponse.builder()
                .wine(wineMapper.toDto(wine))
                .matchScore(score)
                .matchReasoning(finalReasoning)
                .build();
    }

    private List<WineType> getPreferredTypesForDish(String dish) {
        // Ищем частичное совпадение в ключах мапы
        return PAIRING_RULES.entrySet().stream()
                .filter(entry -> dish.toLowerCase().contains(entry.getKey().toLowerCase())
                        || entry.getKey().toLowerCase().contains(dish.toLowerCase()))
                .findFirst()
                .map(Map.Entry::getValue)
                .orElse(List.of()); // Если блюдо неизвестно, не даем баллов за тип
    }

    private boolean isPriceMatch(BigDecimal price, String range) {
        if ("under-20".equals(range)) {
            return price.compareTo(BigDecimal.valueOf(20)) <= 0;
        } else if ("20-50".equals(range)) {
            return price.compareTo(BigDecimal.valueOf(20)) > 0 && price.compareTo(BigDecimal.valueOf(50)) <= 0;
        } else if ("50-plus".equals(range)) {
            return price.compareTo(BigDecimal.valueOf(50)) > 0;
        }
        return false;
    }
}
