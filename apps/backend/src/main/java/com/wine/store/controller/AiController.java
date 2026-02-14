package com.wine.store.controller;

import lombok.RequiredArgsConstructor;
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
public class AiController {

    @GetMapping("/search")
    public Map<String, String> vectorSearch(@RequestParam String query) {
        // Placeholder for Vector Search
        return Map.of("message", "AI Search not implemented yet", "query", query);
    }

    @PostMapping("/recommend")
    public List<?> recommend(@RequestBody Map<String, Object> preferences) {
        return Collections.emptyList();
    }
}
