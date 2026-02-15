package com.wine.store.controller;

import com.wine.store.dto.ApiResponse;
import com.wine.store.dto.WineDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * НАЗНАЧЕНИЕ: API для AI функций (Сомелье, Поиск).
 * ЗАВИСИМОСТИ: Spring AI (Future).
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "AI", description = "Функции искусственного интеллекта (в разработке)")
public class AiController {

    private final com.wine.store.service.AiSommelierService aiSommelierService;

    @GetMapping("/search")
    @Operation(summary = "Векторный поиск вин (AI)", description = "Экспериментальный поиск похожих вин на основе текстового описания.")
    public ResponseEntity<ApiResponse<List<WineDTO>>> vectorSearch(
            @Parameter(description = "Текстовое описание для поиска", example = "Red fruity wine with soft tannins") @RequestParam String query) {
        log.info("GET /api/ai/search - query: {}", query);
        return ResponseEntity.ok(ApiResponse.success(List.of()));
    }

    @PostMapping("/recommend")
    @Operation(summary = "Получить рекомендации сомелье", description = "Анализирует запрос (блюдо, бюджет, повод) и возвращает список вин с оценкой совместимости.")
    public ResponseEntity<ApiResponse<List<com.wine.store.dto.SommelierResponse>>> recommend(
            @jakarta.validation.Valid @RequestBody com.wine.store.dto.SommelierRequest request) {
        log.info("POST /api/ai/recommend - request: {}", request);
        return ResponseEntity.ok(ApiResponse.success(aiSommelierService.recommendWines(request)));
    }
}
