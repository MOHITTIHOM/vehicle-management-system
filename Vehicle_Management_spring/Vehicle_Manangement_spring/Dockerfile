# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Ensure Maven wrapper script is executable
RUN chmod +x mvnw

# Package the application using Maven, skipping tests
RUN ./mvnw clean package -DskipTests

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/Vehicle_Manangement_spring-0.0.1-SNAPSHOT.jar"]
