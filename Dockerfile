FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
LABEL authors="ropold"
COPY backend/target/restaurantfinder.jar restaurantfinder.jar
ENTRYPOINT ["java", "-jar", "restaurantfinder.jar"]