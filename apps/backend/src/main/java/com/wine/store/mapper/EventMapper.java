package com.wine.store.mapper;

import com.wine.store.dto.EventDTO;
import com.wine.store.model.Event;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventMapper {
    EventDTO toDto(Event event);

    Event toEntity(EventDTO dto);
}
