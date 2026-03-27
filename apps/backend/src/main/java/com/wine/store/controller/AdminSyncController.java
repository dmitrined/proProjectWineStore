package com.wine.store.controller;

import com.wine.store.dto.ApiResponse;
import com.wine.store.service.WooCommerceSyncService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/sync")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Sync", description = "Управление интерациями/синхронизацией данных")
public class AdminSyncController {

    private final WooCommerceSyncService syncService;

    @PostMapping("/woocommerce")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Запустить синхронизацию", description = "Запускает импорт товаров из WooCommerce.")
    public ResponseEntity<ApiResponse<String>> triggerSync() {
        log.info("POST /api/admin/sync/woocommerce triggered");
        syncService.syncProducts();
        return ResponseEntity.ok(ApiResponse.success("Синхронизация WooCommerce завершена."));
    }
}
