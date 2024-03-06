# ----- SETUP JAVA -----
FROM alpine:3.19 AS base

ENV JAVA_HOME=/usr/lib/jvm/default-jvm

RUN apk update \
  && apk add --no-cache openjdk17


# ----- BUILD -----
FROM base AS builder

WORKDIR /app

COPY . .

RUN ./gradlew :bootJar


# ----- RUN -----
FROM base AS release

ARG DATA_DIRECTORY=/data
ENV DATA_DIRECTORY=${DATA_DIRECTORY}

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
