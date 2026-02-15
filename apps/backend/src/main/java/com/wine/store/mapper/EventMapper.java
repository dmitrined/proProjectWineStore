package com.wine.store.mapper;

import com.wine.store.dto.EventDTO;
import com.wine.store.model.Event;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventMapper {
    EventDTO toDto(Event event);

    Event toEntity(EventDTO dto);

    @org.mapstruct.Mapping(target = "id", ignore = true)
    @org.mapstruct.Mapping(target = "bookedSpots", ignore = true)
    void updateEntityFromDto(EventDTO dto, @org.mapstruct.MappingTarget Event entity);
}
