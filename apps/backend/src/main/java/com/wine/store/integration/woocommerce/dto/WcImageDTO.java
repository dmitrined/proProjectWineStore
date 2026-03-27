package com.wine.store.integration.woocommerce.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WcImageDTO {
    private Long id;
    private String src;
    private String name;
    private String alt;
}
