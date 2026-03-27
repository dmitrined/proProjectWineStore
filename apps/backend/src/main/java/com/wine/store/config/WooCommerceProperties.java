package com.wine.store.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "woocommerce.api")
public class WooCommerceProperties {
    private String baseUrl;
    private String consumerKey;
    private String consumerSecret;
    private String eventsCategorySlug;
}
