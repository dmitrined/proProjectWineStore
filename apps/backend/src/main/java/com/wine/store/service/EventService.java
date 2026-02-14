package com.wine.store.service;

import com.wine.store.dto.BookingRequest;
import com.wine.store.dto.EventDTO;
import com.wine.store.model.Booking;
import com.wine.store.model.BookingStatus;
import com.wine.store.model.Event;
import com.wine.store.repository.BookingRepository;
import com.wine.store.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * НАЗНАЧЕНИЕ: Бизнес-логика событий и бронирования.
 */
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    @Transactional(readOnly = true)
    public List<EventDTO> getUpcomingEvents() {
        return eventRepository.findByDateAfterOrderByDateAsc(LocalDate.now().minusDays(1))
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EventDTO getEventBySlug(String slug) {
        return eventRepository.findBySlug(slug)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Event not found: " + slug));
    }

    @Transactional
    public void createBooking(BookingRequest request) {
        Event event = eventRepository.findById(request.eventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getBookedSpots() + request.guests() > event.getTotalSpots()) {
            throw new RuntimeException("Not enough spots available");
        }

        event.setBookedSpots(event.getBookedSpots() + request.guests());
        eventRepository.save(event);

        Booking booking = Booking.builder()
                .event(event)
                .customerName(request.name())
                .customerEmail(request.email())
                .customerPhone(request.phone())
                .guestsCount(request.guests())
                // .totalPrice(...) // logic to calculate price if needed
                .status(BookingStatus.CONFIRMED)
                .build();

        bookingRepository.save(booking);
        // todo: send email confirmation
    }

    private EventDTO convertToDto(Event event) {
        return EventDTO.builder()
                .id(event.getId())
                .title(event.getTitle())
                .slug(event.getSlug())
                .description(event.getDescription())
                .imageUrl(event.getImageUrl())
                .date(event.getDate())
                .time(event.getTime())
                .location(event.getLocation())
                .pricePerPerson(event.getPricePerPerson())
                .totalSpots(event.getTotalSpots())
                .bookedSpots(event.getBookedSpots())
                .isFull(event.isFull())
                .category(event.getCategory())
                .build();
    }
}
