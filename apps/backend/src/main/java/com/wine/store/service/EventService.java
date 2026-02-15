package com.wine.store.service;

import com.wine.store.dto.BookingRequest;
import com.wine.store.dto.EventDTO;
import com.wine.store.mapper.EventMapper;
import com.wine.store.model.Booking;
import com.wine.store.model.BookingStatus;
import com.wine.store.model.Event;
import com.wine.store.repository.BookingRepository;
import com.wine.store.repository.EventRepository;
import com.wine.store.exception.AppException;
import com.wine.store.exception.ResourceNotFoundException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * НАЗНАЧЕНИЕ: Бизнес-логика событий и бронирования.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {

    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;
    private final EventMapper eventMapper;

    @Transactional(readOnly = true)
    public List<EventDTO> getUpcomingEvents() {
        log.info("Fetching upcoming events");
        return eventRepository.findByDateAfterOrderByDateAsc(LocalDate.now().minusDays(1))
                .stream()
                .map(eventMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EventDTO getEventBySlug(String slug) {
        log.info("Fetching event by slug: {}", slug);
        return eventRepository.findBySlug(slug)
                .map(eventMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + slug));
    }

    @Transactional
    public void createBooking(BookingRequest request) {
        log.info("Creating booking for event ID: {} for guests: {}", request.eventId(), request.guests());
        int updatedRows = eventRepository.incrementBookedSpots(request.eventId(), request.guests());

        if (updatedRows == 0) {
            log.warn("Failed to create booking - not enough spots for event ID: {}", request.eventId());
            throw new AppException("Not enough spots available or event not found", HttpStatus.CONFLICT);
        }

        Event event = eventRepository.findById(Objects.requireNonNull(request.eventId()))
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        BigDecimal totalPrice = event.getPricePerPerson().multiply(BigDecimal.valueOf(request.guests()));

        Booking booking = Booking.builder()
                .event(event)
                .customerName(request.name())
                .customerEmail(request.email())
                .customerPhone(request.phone())
                .guestsCount(request.guests())
                .totalPrice(totalPrice)
                .status(BookingStatus.CONFIRMED)
                .build();

        if (booking == null) {
            throw new AppException("Failed to create booking", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        bookingRepository.save(booking);
        // todo: send email confirmation
    }

    @Transactional
    public EventDTO createEvent(EventDTO eventDTO) {
        log.info("Creating new event: {}", eventDTO);
        Event event = eventMapper.toEntity(eventDTO);
        if (event.getSlug() == null || event.getSlug().isEmpty()) {
            event.setSlug(generateSlug(event.getTitle()));
        }
        Event savedEvent = eventRepository.save(event);
        return eventMapper.toDto(savedEvent);
    }

    @Transactional
    @SuppressWarnings("null")
    public EventDTO updateEvent(String slug, EventDTO eventDTO) {
        log.info("Updating event with slug: {}", slug);
        Event existingEvent = eventRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + slug));

        eventMapper.updateEntityFromDto(eventDTO, existingEvent);
        return eventMapper.toDto(eventRepository.save(existingEvent));
    }

    @Transactional
    public void deleteEvent(String slug) {
        log.info("Deleting event with slug: {}", slug);
        Event event = eventRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + slug));
        eventRepository.delete(event);
    }

    private String generateSlug(String title) {
        return title.toLowerCase().replaceAll("[^a-z0-9\\-]", "-").replaceAll("-+", "-");
    }
}
