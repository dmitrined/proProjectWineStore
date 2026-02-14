package com.wine.store.controller;

import com.wine.store.dto.WineDTO;
import com.wine.store.dto.WineSearchRequest;
import com.wine.store.service.WineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * НАЗНАЧЕНИЕ: API для каталога вин.
 */
@RestController
@RequestMapping("/api/wines")
@RequiredArgsConstructor
@Slf4j
public class WineController {

    private final WineService wineService;

    @GetMapping
    public ResponseEntity<Page<WineDTO>> getWines(
            WineSearchRequest filters,
            @PageableDefault(size = 12) Pageable pageable) {
        log.info("GET /api/wines - filters: {}, pageable: {}", filters, pageable);
        return ResponseEntity.ok(wineService.getAllWines(filters, pageable));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<WineDTO> getWine(@PathVariable String slug) {
        log.info("GET /api/wines/{}", slug);
        return ResponseEntity.ok(wineService.getWineBySlug(slug));
    }

    @GetMapping("/filters/grapes")
    public ResponseEntity<List<String>> getGrapeVarieties() {
        log.info("GET /api/wines/filters/grapes");
        return ResponseEntity.ok(wineService.getAllGrapes());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<WineDTO>> getFeaturedWines() {
        log.info("GET /api/wines/featured");
        return ResponseEntity.ok(wineService.getFeaturedWines());
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<WineDTO>> getTopRatedWines() {
        log.info("GET /api/wines/top-rated");
        return ResponseEntity.ok(wineService.getTopRatedWines());
    }
}
