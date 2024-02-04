FROM maven:3.6.3-openjdk-11 As build
COPY . . 
RUN mvn clean package -DskipTests

FROM opebjdk:11-jre-slim
COPY --from=build /target/assignment1-0.0.1-SNAPSHOT.jar assignment1.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "assignment1.jar"]
