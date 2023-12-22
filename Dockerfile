#chargement de MAVEN
FROM maven:3.9.6-amazoncorretto-21 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers pom.xml et source dans l'image
COPY pom.xml .
COPY src src

# Exécuter mvn clean install pour construire l'application
RUN mvn clean install -DskipTests

# Définir une image de base
FROM eclipse-temurin:21.0.1_12-jre-alpine
MAINTAINER OMAR_MAHI

# Ajouter un point de montage pour sauvegarder les données temporaires
VOLUME /tmp

# Ajouter le fichier .jar de votre application
COPY --from=build /app/target/SDISMap-1.0.0.jar app.jar

# Exécuter l'application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
