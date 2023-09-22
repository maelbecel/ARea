FROM maven:3.9.4-eclipse-temurin-17 AS builder

COPY . /app/
WORKDIR /app/

RUN mvn clean
RUN mvn dependency:resolve
RUN mvn package

FROM eclipse-temurin:17

COPY --from=builder /app/target/ /app/target/
WORKDIR /app/target/

CMD java -jar area-1.0.0.jar