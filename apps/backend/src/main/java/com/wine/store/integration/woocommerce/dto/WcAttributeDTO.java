package com.wine.store.integration.woocommerce.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WcAttributeDTO {
    private Long id;
    private String name;
    private String slug;
    private List<String> options;
}
