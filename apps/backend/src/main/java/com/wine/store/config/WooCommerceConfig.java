package com.wine.store.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class WooCommerceConfig {

    @Bean
    public RestTemplate wooCommerceRestTemplate(RestTemplateBuilder builder, WooCommerceProperties properties) {
        return builder
                .rootUri(properties.getBaseUrl())
                .basicAuthentication(properties.getConsumerKey(), properties.getConsumerSecret())
                .build();
    }
}
