FROM openjdk:jdk-slim-bullseye
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=./target/cash-control-server-0.1.0.jar
COPY ${JAR_FILE} cash-control-server.jar
ENTRYPOINT ["java", "-jar", "/cash-control-server.jar"]
