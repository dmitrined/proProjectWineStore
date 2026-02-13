package com.wine.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * НАЗНАЧЕНИЕ: Точка входа в Spring Boot приложение.
 * ЗАВИСИМОСТИ: Spring Boot Starter Web, Data JPA.
 * ОСОБЕННОСТИ: Инициализация контекста, сканирование компонентов.
 */
@SpringBootApplication
public class ProProjectWineStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProProjectWineStoreApplication.class, args);
	}

}
