package com.wine.store.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * НАЗНАЧЕНИЕ: API для AI функций (Сомелье, Поиск).
 * ЗАВИСИМОСТИ: Spring AI (Future).
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Slf4j
public class AiController {

    @GetMapping("/search")
    public Map<String, String> vectorSearch(@RequestParam String query) {
        log.info("GET /api/ai/search - query: {}", query);
        // Placeholder for Vector Search
        return Map.of("message", "AI Search not implemented yet", "query", query);
    }

    @PostMapping("/recommend")
    public List<?> recommend(@RequestBody Map<String, Object> preferences) {
        log.info("POST /api/ai/recommend - preferences: {}", preferences);
        return Collections.emptyList();
    }
}
