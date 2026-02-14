package com.wine.store.controller;

import com.wine.store.dto.BookingRequest;
import com.wine.store.dto.EventDTO;
import com.wine.store.service.EventService;
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
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventDTO>> getUpcomingEvents() {
        log.info("GET /api/events");
        return ResponseEntity.ok(eventService.getUpcomingEvents());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<EventDTO> getEvent(@PathVariable String slug) {
        log.info("GET /api/events/{}", slug);
        return ResponseEntity.ok(eventService.getEventBySlug(slug));
    }

    @PostMapping("/bookings")
    public ResponseEntity<Void> createBooking(@RequestBody @Valid BookingRequest request) {
        log.info("POST /api/events/bookings - request: {}", request);
        eventService.createBooking(request);
        return ResponseEntity.ok().build();
    }
}
