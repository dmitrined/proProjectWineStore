#!/bin/bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-21.jdk/Contents/Home
echo "Используем JAVA_HOME=$JAVA_HOME"
./mvnw clean compile spring-boot:run
