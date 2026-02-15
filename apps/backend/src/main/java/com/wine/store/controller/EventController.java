package com.wine.store.controller;

import com.wine.store.dto.ApiResponse;
import com.wine.store.dto.BookingRequest;
import com.wine.store.dto.EventDTO;
import com.wine.store.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * НАЗНАЧЕНИЕ: API для событий и бронирования.
 */
@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Events", description = "Управление событиями и бронированием")
public class EventController {

    private final EventService eventService;

    @GetMapping
    @Operation(summary = "Получить список предстоящих событий", description = "Возвращает список всех активных и предстоящих дегустаций и мероприятий.")
    public ResponseEntity<ApiResponse<List<EventDTO>>> getUpcomingEvents() {
        log.info("GET /api/events");
        return ResponseEntity.ok(ApiResponse.success(eventService.getUpcomingEvents()));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Получить событие по slug", description = "Возвращает детальную информацию о конкретном событии.", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Событие найдено"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Событие не найдено", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    public ResponseEntity<ApiResponse<EventDTO>> getEvent(
            @Parameter(description = "URL-friendly идентификатор события", example = "riesling-tasting-2026") @PathVariable String slug) {
        log.info("GET /api/events/{}", slug);
        return ResponseEntity.ok(ApiResponse.success(eventService.getEventBySlug(slug)));
    }

    @PostMapping("/bookings")
    @Operation(summary = "Создать бронирование на событие", description = "Регистрирует пользователя на участие в событии.", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Бронирование создано"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Ошибка валидации или нет мест", content = @io.swagger.v3.oas.annotations.media.Content)
    })
    public ResponseEntity<ApiResponse<Void>> createBooking(@RequestBody @Valid BookingRequest request) {
        log.info("POST /api/events/bookings - request: {}", request);
        eventService.createBooking(request);
        return ResponseEntity.ok(ApiResponse.success(null, "Booking created successfully"));
    }

    @PostMapping
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Создать новое событие", description = "Создает новую запись о событии. Требует роли ADMIN.")
    public ResponseEntity<ApiResponse<EventDTO>> createEvent(@Valid @RequestBody EventDTO eventDTO) {
        log.info("POST /api/events");
        return ResponseEntity.ok(ApiResponse.success(eventService.createEvent(eventDTO)));
    }

    @org.springframework.web.bind.annotation.PutMapping("/{slug}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Обновить событие", description = "Обновляет существующую запись о событии. Требует роли ADMIN.")
    public ResponseEntity<ApiResponse<EventDTO>> updateEvent(
            @PathVariable String slug,
            @Valid @RequestBody EventDTO eventDTO) {
        log.info("PUT /api/events/{}", slug);
        return ResponseEntity.ok(ApiResponse.success(eventService.updateEvent(slug, eventDTO)));
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/{slug}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Удалить событие", description = "Удаляет запись о событии. Требует роли ADMIN.")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(@PathVariable String slug) {
        log.info("DELETE /api/events/{}", slug);
        eventService.deleteEvent(slug);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
