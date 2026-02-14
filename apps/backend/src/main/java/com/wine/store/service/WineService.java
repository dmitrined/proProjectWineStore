package com.wine.store.service;

import com.wine.store.dto.WineDTO;
import com.wine.store.dto.WineSearchRequest;
import com.wine.store.model.Wine;
import com.wine.store.repository.WineRepository;
import com.wine.store.service.spec.WineSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Бизнес-логика каталога вин.
 */
@Service
@RequiredArgsConstructor
public class WineService {

    private final WineRepository wineRepository;

    @Transactional(readOnly = true)
    public Page<WineDTO> getAllWines(WineSearchRequest request, Pageable pageable) {
        Specification<Wine> spec = WineSpecification.getSpec(request);
        Page<Wine> wines = wineRepository.findAll(spec, pageable);
        return wines.map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public WineDTO getWineBySlug(String slug) {
        return wineRepository.findBySlug(slug)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Wine not found: " + slug));
    }

    @Transactional(readOnly = true)
    public List<String> getAllGrapes() {
        return wineRepository.findAllGrapeVarieties();
    }

    private WineDTO convertToDto(Wine wine) {
        return WineDTO.builder()
                .id(wine.getId())
                .name(wine.getName())
                .slug(wine.getSlug())
                .description(wine.getDescription())
                .shortDescription(wine.getShortDescription())
                .imageUrl(wine.getImageUrl())
                .price(wine.getPrice())
                .salePrice(wine.getSalePrice())
                .isSale(wine.isSale())
                .stockStatus(wine.getStockStatus())
                .stockQuantity(wine.getStockQuantity())
                .type(wine.getType())
                .grapeVariety(wine.getGrapeVariety())
                .year(wine.getReleaseYear())
                .alcohol(wine.getAlcohol())
                .acidity(wine.getAcidity())
                .sugar(wine.getSugar())
                .flavor(wine.getFlavor())
                .qualityLevel(wine.getQualityLevel())
                .edition(wine.getEdition())
                .rating(wine.getRating())
                .recommendedDishes(wine.getRecommendedDishes())
                .tags(wine.getTags())
                .build();
    }
}
