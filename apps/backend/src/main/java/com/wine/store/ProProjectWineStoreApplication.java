package com.wine.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import lombok.extern.slf4j.Slf4j;

/**
 * НАЗНАЧЕНИЕ: Точка входа в Spring Boot приложение.
 * ЗАВИСИМОСТИ: Spring Boot Starter Web, Data JPA.
 * ОСОБЕННОСТИ: Инициализация контекста, сканирование компонентов.
 */
@SpringBootApplication
@Slf4j
public class ProProjectWineStoreApplication {

	public static void main(String[] args) {
		log.info("Starting ProProjectWineStoreApplication...");
		SpringApplication.run(ProProjectWineStoreApplication.class, args);
		log.info("ProProjectWineStoreApplication logic is running.");
	}

}
