FROM maven:3.6.3-openjdk-14-slim AS build

# Create new directory workspace
RUN mkdir -p /workspace
WORKDIR /workspace

# Copy the pom file and src folder to workspace
COPY server/pom.xml /workspace
COPY server/src /workspace/src
RUN mvn -B package --file pom.xml -DskipTests

FROM openjdk:14-slim
COPY --from=build /workspace/target/demo-0.0.1-SNAPSHOT.jar app.jar
# Exposing the prot
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]