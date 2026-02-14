#!/bin/bash

# Находим путь к JDK 21 (Zulu 21)
export JAVA_HOME=$(/usr/libexec/java_home -v 21 2>/dev/null)

if [ -z "$JAVA_HOME" ]; then
    echo "Ошибка: JDK 21 не найден в системе."
    echo "Пожалуйста, установите JDK 21 для работы проекта."
    exit 1
fi

echo "Используется JAVA_HOME: $JAVA_HOME"
export PATH="$JAVA_HOME/bin:$PATH"

# Проверяем аргументы
case "$1" in
    "build")
        ./mvnw clean compile
        ;;
    "run")
        ./mvnw spring-boot:run
        ;;
    "package")
        ./mvnw clean package -DskipTests
        ;;
    *)
        echo "Использование: $0 {build|run|package}"
        echo "  build   - Сборка проекта (clean compile)"
        echo "  run     - Запуск приложения (spring-boot:run)"
        echo "  package - Сборка JAR файла"
        exit 1
        ;;
esac
