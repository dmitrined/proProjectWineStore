package com.wine.store.controller;

import com.wine.store.model.Wine;
import com.wine.store.repository.WineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.wine.store.dto.WineSearchRequest;
import com.wine.store.dto.WineResponse;
import com.wine.store.service.WineSpecification;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

/**
 * НАЗНАЧЕНИЕ: API для работы с винами.
 * ЗАВИСИМОСТИ: WineRepository.
 */
@RestController
@RequestMapping("/api/wines")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend dev server
public class WineController {

    private final WineRepository wineRepository;

    @GetMapping
    public Page<WineResponse> getAllWines(
            WineSearchRequest request,
            Pageable pageable) {
        Specification<Wine> spec = WineSpecification.getSpec(request);
        Page<Wine> wines = wineRepository.findAll(spec, pageable);
        return wines.map(this::mapToResponse);
    }

    private WineResponse mapToResponse(Wine wine) {
        return new WineResponse(
                wine.getId(),
                wine.getName(),
                wine.getSlug(),
                wine.getPrice(),
                wine.isSale(),
                wine.getSalePrice(),
                wine.getDescription(),
                wine.getShortDescription(),
                wine.getImage(),
                wine.getType(),
                wine.getStockStatus(),
                wine.getStockQuantity(),
                wine.getGrapeVariety(),
                wine.getYear(),
                wine.getAlcohol(),
                wine.getAcidity(),
                wine.getSugar(),
                wine.getFlavor(),
                wine.getQualityLevel(),
                wine.getEdition(),
                wine.getRating(),
                wine.getRecommendedDishes(),
                wine.getTags(),
                wine.getTemp());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Wine> getWineById(@PathVariable String id) {
        Optional<Wine> wine = wineRepository.findById(id);
        if (wine.isEmpty()) {
            // Try to find by slug if UUID lookup fails (or if we treat ID as slug mixed)
            // But for now, strict ID.
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(wine.get());
    }

}
