package com.wine.store.integration.woocommerce.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WcProductDTO {
    private Long id;
    private String name;
    private String slug;
    private String type;
    private String status;
    private String description;
    @JsonProperty("short_description")
    private String shortDescription;
    private String price;
    @JsonProperty("regular_price")
    private String regularPrice;
    @JsonProperty("sale_price")
    private String salePrice;
    @JsonProperty("stock_status") // instock, outofstock
    private String stockStatus;
    @JsonProperty("stock_quantity")
    private Integer stockQuantity;
    private List<WcCategoryDTO> categories;
    private List<WcAttributeDTO> attributes;
    private List<WcImageDTO> images;
}
