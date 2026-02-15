package com.wine.store.mapper;

import com.wine.store.dto.WineDTO;
import com.wine.store.model.Wine;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WineMapper {
    @Mapping(source = "releaseYear", target = "year")
    WineDTO toDto(Wine wine);

    @Mapping(source = "year", target = "releaseYear")
    Wine toEntity(WineDTO dto);

    @Mapping(source = "year", target = "releaseYear")
    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(WineDTO dto, @org.mapstruct.MappingTarget Wine entity);
}
