#!/bin/bash

# Путь к JDK 21, обнаруженный в системе
export JAVA_HOME="/Library/Java/JavaVirtualMachines/zulu-21.jdk/Contents/Home"

echo "Используем JAVA_HOME: $JAVA_HOME"
java_version=$("$JAVA_HOME/bin/java" -version 2>&1 | head -n 1)
echo "Версия Java: $java_version"

# Очистка и запуск
./mvnw clean spring-boot:run
