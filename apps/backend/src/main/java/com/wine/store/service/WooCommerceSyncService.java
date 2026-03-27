package com.wine.store.service;

import com.wine.store.config.WooCommerceProperties;
import com.wine.store.integration.woocommerce.WooCommerceClient;
import com.wine.store.integration.woocommerce.dto.WcCategoryDTO;
import com.wine.store.integration.woocommerce.dto.WcProductDTO;
import com.wine.store.model.*;
import com.wine.store.repository.EventRepository;
import com.wine.store.repository.WineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WooCommerceSyncService {

    private final WooCommerceClient wooCommerceClient;
    private final WooCommerceProperties properties;
    private final WineRepository wineRepository;
    private final EventRepository eventRepository;

    @Scheduled(cron = "0 0 * * * *") // Every hour
    @Transactional
    public void syncProducts() {
        log.info("Starting WooCommerce sync...");
        int page = 1;
        int perPage = 50;
        int totalProcessed = 0;

        while (true) {
            List<WcProductDTO> products = wooCommerceClient.getProducts(page, perPage);
            if (products == null || products.isEmpty()) {
                break;
            }

            for (WcProductDTO product : products) {
                if (isEvent(product)) {
                    syncEvent(product);
                } else {
                    syncWine(product);
                }
                totalProcessed++;
            }
            if (products.size() < perPage) {
                break; // Last page
            }
            page++;
        }
        log.info("Finished WooCommerce sync. Total processed: {}", totalProcessed);
    }

    private boolean isEvent(WcProductDTO product) {
        if (product.getCategories() == null) return false;
        String evSlug = properties.getEventsCategorySlug() != null ? properties.getEventsCategorySlug().toLowerCase() : "veranstaltungen";
        return product.getCategories().stream()
                .anyMatch(cat -> evSlug.equals(cat.getSlug().toLowerCase()));
    }

    private void syncWine(WcProductDTO dto) {
        try {
            String slug = validateSlug(dto.getSlug());
            Wine wine = wineRepository.findBySlug(slug).orElse(new Wine());
            wine.setSlug(slug);
            wine.setName(dto.getName());
            wine.setDescription(dto.getDescription() != null && !dto.getDescription().isEmpty() 
                ? dto.getDescription() : dto.getShortDescription());
            
            if (dto.getImages() != null && !dto.getImages().isEmpty()) {
                wine.setImageUrl(dto.getImages().get(0).getSrc());
            }

            wine.setPrice(parsePrice(dto.getRegularPrice(), dto.getPrice()));
            
            if (dto.getSalePrice() != null && !dto.getSalePrice().isEmpty()) {
                wine.setSalePrice(parsePrice(dto.getSalePrice(), "0"));
                wine.setSale(true);
            } else {
                wine.setSalePrice(null);
                wine.setSale(false);
            }

            wine.setStockStatus("instock".equals(dto.getStockStatus()) ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK);
            wine.setStockQuantity(dto.getStockQuantity());
            
            // Map Type from categories — skip non-wine products
            WineType wineType = mapWineType(dto.getCategories());
            if (wineType == null) {
                log.debug("Skipping non-wine product: {} (no matching wine category)", dto.getSlug());
                return;
            }
            wine.setType(wineType);

            // Map Attributes
            if (dto.getAttributes() != null) {
                for (var attr : dto.getAttributes()) {
                    String attrSlug = attr.getSlug() != null ? attr.getSlug().toLowerCase() : "";
                    String value = (attr.getOptions() != null && !attr.getOptions().isEmpty()) ? attr.getOptions().get(0) : null;
                    
                    if (value == null) continue;

                    if ("pa_jahrgang".equals(attrSlug)) {
                        try { wine.setReleaseYear(Integer.parseInt(value)); } catch (NumberFormatException ignored) {}
                    } else if ("pa_rebsorte".equals(attrSlug)) {
                        wine.setGrapeVariety(value);
                    } else if ("pa_geschmack".equals(attrSlug)) {
                        wine.setFlavor(mapWineFlavor(value));
                    } else if ("pa_qualitaetsstufe".equals(attrSlug)) {
                        wine.setEdition(value);
                    }
                }
            }
            
            wineRepository.save(wine);
            log.debug("Synced Wine: {}", slug);
        } catch (Exception e) {
            log.error("Failed to sync wine {}", dto.getId(), e);
        }
    }

    private WineType mapWineType(List<WcCategoryDTO> categories) {
        if (categories == null || categories.isEmpty()) return null;
        for (var cat : categories) {
            String slug = cat.getSlug() != null ? cat.getSlug().toLowerCase().trim() : "";
            switch (slug) {
                case "rot", "rotwein", "rotweine" -> { return WineType.RED; }
                case "weiss", "weisswein", "weissweine" -> { return WineType.WHITE; }
                case "rose", "ros\u00e9", "rosewein", "ros\u00e9wein" -> { return WineType.ROSE; }
                case "sekt", "cremant", "cr\u00e9mant", "perlwein", "secco", "schaumwein" -> { return WineType.SPARKLING; }
            }
        }
        return null; // Not a wine — caller skips it
    }

    private WineFlavor mapWineFlavor(String value) {
        if (value == null) return WineFlavor.TROCKEN;
        String v = value.toLowerCase();
        if (v.contains("trocken")) return WineFlavor.TROCKEN;
        if (v.contains("feinherb")) return WineFlavor.FEINHERB;
        if (v.contains("halbtrocken")) return WineFlavor.HALBTROCKEN;
        if (v.contains("lieblich") || v.contains("mild")) return WineFlavor.LIEBLICH;
        return WineFlavor.TROCKEN;
    }

    private void syncEvent(WcProductDTO dto) {
        try {
            String slug = validateSlug(dto.getSlug());
            Event event = eventRepository.findBySlug(slug).orElse(new Event());
            event.setSlug(slug);
            event.setTitle(dto.getName());
            event.setDescription(dto.getDescription() != null && !dto.getDescription().isEmpty()
                ? dto.getDescription() : dto.getShortDescription());
            
            if (dto.getImages() != null && !dto.getImages().isEmpty()) {
                event.setImageUrl(dto.getImages().get(0).getSrc());
            }

            event.setPricePerPerson(parsePrice(dto.getPrice(), "0"));
            if (event.getTotalSpots() == null) {
                event.setTotalSpots(dto.getStockQuantity() != null ? dto.getStockQuantity() : 50);
            }
            
            // Defaults for simplified Event model
            if (event.getDate() == null) event.setDate(LocalDate.now().plusDays(14));
            if (event.getTime() == null) event.setTime("18:00");
            if (event.getLocation() == null) event.setLocation("Fellbacher Weingärtner eG");
            if (event.getCategory() == null) event.setCategory(EventCategory.WEINPROBE);

            eventRepository.save(event);
            log.debug("Synced Event: {}", slug);
        } catch (Exception e) {
            log.error("Failed to sync event {}", dto.getId(), e);
        }
    }

    private String validateSlug(String slug) {
        if (slug == null || slug.isEmpty()) return "item-" + System.currentTimeMillis();
        return slug;
    }

    private BigDecimal parsePrice(String priceStr, String fallback) {
        try {
            if (priceStr == null || priceStr.isEmpty()) {
                return new BigDecimal(fallback != null && !fallback.isEmpty() ? fallback : "0.0");
            }
            return new BigDecimal(priceStr);
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }
}
