package com.wine.store.integration.woocommerce;

import com.wine.store.integration.woocommerce.dto.WcProductDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WooCommerceClient {

    private final RestTemplate wooCommerceRestTemplate;

    public List<WcProductDTO> getProducts(int page, int perPage) {
        String url = "/products?page=" + page + "&per_page=" + perPage;
        try {
            ResponseEntity<List<WcProductDTO>> response = wooCommerceRestTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching products from WooCommerce API: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }
}
