package com.wine.store.controller;

import com.wine.store.dto.ApiResponse;
import com.wine.store.dto.WineDTO;
import com.wine.store.dto.WineSearchRequest;
import com.wine.store.service.WineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
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
@Tag(name = "Wines", description = "Управление каталогом вин")
public class WineController {

    private final WineService wineService;

    @GetMapping
    @Operation(summary = "Получить список вин с фильтрацией", description = "Возвращает страницу вин на основе переданных фильтров поиска.")
    public ResponseEntity<ApiResponse<Page<WineDTO>>> getWines(
            @Valid WineSearchRequest filters,
            @PageableDefault(size = 12) @NonNull Pageable pageable) {
        log.info("GET /api/wines - filters: {}, pageable: {}", filters, pageable);
        return ResponseEntity.ok(ApiResponse.success(wineService.getAllWines(filters, pageable)));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Получить вино по slug", description = "Возвращает детальную информацию о вине по его уникальному текстовому идентификатору (slug).", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Вино найдено"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Вино не найдено", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    public ResponseEntity<ApiResponse<WineDTO>> getWine(
            @Parameter(description = "URL-friendly идентификатор вина", example = "riesling-trocken-2022") @PathVariable String slug) {
        log.info("GET /api/wines/{}", slug);
        return ResponseEntity.ok(ApiResponse.success(wineService.getWineBySlug(slug)));
    }

    @GetMapping("/filters/grapes")
    @Operation(summary = "Получить список всех сортов винограда", description = "Возвращает уникальный список всех сортов винограда, представленных в каталоге.")
    public ResponseEntity<ApiResponse<List<String>>> getGrapeVarieties() {
        log.info("GET /api/wines/filters/grapes");
        return ResponseEntity.ok(ApiResponse.success(wineService.getAllGrapes()));
    }

    @GetMapping("/featured")
    @Operation(summary = "Получить список популярных вин", description = "Возвращает список вин, отмеченных как избранные/популярные.")
    public ResponseEntity<ApiResponse<List<WineDTO>>> getFeaturedWines() {
        log.info("GET /api/wines/featured");
        return ResponseEntity.ok(ApiResponse.success(wineService.getFeaturedWines()));
    }

    @GetMapping("/top-rated")
    @Operation(summary = "Получить список вин с высоким рейтингом", description = "Возвращает список вин, отсортированных по рейтингу.")
    public ResponseEntity<ApiResponse<List<WineDTO>>> getTopRatedWines() {
        log.info("GET /api/wines/top-rated");
        return ResponseEntity.ok(ApiResponse.success(wineService.getTopRatedWines()));
    }

    @org.springframework.web.bind.annotation.PostMapping
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Создать новое вино", description = "Создает новую запись о вине. Требует роли ADMIN.")
    public ResponseEntity<ApiResponse<WineDTO>> createWine(
            @Valid @org.springframework.web.bind.annotation.RequestBody WineDTO wineDTO) {
        log.info("POST /api/wines");
        return ResponseEntity.ok(ApiResponse.success(wineService.createWine(wineDTO)));
    }

    @org.springframework.web.bind.annotation.PutMapping("/{slug}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Обновить информацию о вине", description = "Обновляет существующую запись о вине. Требует роли ADMIN.")
    public ResponseEntity<ApiResponse<WineDTO>> updateWine(
            @PathVariable String slug,
            @Valid @org.springframework.web.bind.annotation.RequestBody WineDTO wineDTO) {
        log.info("PUT /api/wines/{}", slug);
        return ResponseEntity.ok(ApiResponse.success(wineService.updateWine(slug, wineDTO)));
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/{slug}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Удалить вино", description = "Удаляет запись о вине. Требует роли ADMIN.")
    public ResponseEntity<ApiResponse<Void>> deleteWine(@PathVariable String slug) {
        log.info("DELETE /api/wines/{}", slug);
        wineService.deleteWine(slug);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
