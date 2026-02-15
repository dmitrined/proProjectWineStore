package com.wine.store.service;

import com.wine.store.dto.WineDTO;
import com.wine.store.dto.WineSearchRequest;
import com.wine.store.mapper.WineMapper;
import com.wine.store.model.Wine;
import com.wine.store.repository.WineRepository;
import com.wine.store.service.spec.WineSpecification;
import com.wine.store.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * НАЗНАЧЕНИЕ: Бизнес-логика каталога вин.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class WineService {
    private final WineRepository wineRepository;
    private final WineMapper wineMapper;

    @Transactional(readOnly = true)
    public @NonNull Page<WineDTO> getAllWines(WineSearchRequest request, @NonNull Pageable pageable) {
        log.info("Fetching wines with filters: {} and pageable: {}", request, pageable);
        Specification<Wine> spec = WineSpecification.getSpec(request);
        Page<Wine> wines = wineRepository.findAll(spec, pageable);
        return wines.map(wineMapper::toDto);
    }

    @Transactional(readOnly = true)
    public WineDTO getWineBySlug(String slug) {
        log.info("Fetching wine by slug: {}", slug);
        return wineRepository.findBySlug(slug)
                .map(wineMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Wine not found: " + slug));
    }

    @Transactional(readOnly = true)
    public List<String> getAllGrapes() {
        return wineRepository.findAllGrapeVarieties();
    }

    @Transactional(readOnly = true)
    public List<WineDTO> getFeaturedWines() {
        return wineRepository.findByFeaturedTrue().stream()
                .map(wineMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<WineDTO> getTopRatedWines() {
        return wineRepository.findTop10ByOrderByRatingDesc().stream()
                .map(wineMapper::toDto)
                .toList();
    }

    @Transactional
    public WineDTO createWine(WineDTO wineDTO) {
        log.info("Creating new wine: {}", wineDTO);
        Wine wine = wineMapper.toEntity(wineDTO);
        // Ensure slug is unique if not provided or handle generating one
        if (wine.getSlug() == null || wine.getSlug().isEmpty()) {
            wine.setSlug(generateSlug(wine.getName()));
        }
        Wine savedWine = wineRepository.save(wine);
        return wineMapper.toDto(savedWine);
    }

    @Transactional
    @SuppressWarnings("null")
    public WineDTO updateWine(String slug, WineDTO wineDTO) {
        log.info("Updating wine with slug: {}", slug);
        Wine existingWine = wineRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Wine not found: " + slug));

        wineMapper.updateEntityFromDto(wineDTO, existingWine);
        return wineMapper.toDto(wineRepository.save(existingWine));
    }

    @Transactional
    public void deleteWine(String slug) {
        log.info("Deleting wine with slug: {}", slug);
        Wine wine = wineRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Wine not found: " + slug));
        wineRepository.delete(wine);
    }

    private String generateSlug(String name) {
        return name.toLowerCase().replaceAll("[^a-z0-9\\-]", "-").replaceAll("-+", "-");
    }
}
