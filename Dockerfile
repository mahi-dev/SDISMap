# Définir une image de base
FROM eclipse-temurin:21.0.1_12-jre-alpine
MAINTAINER OMAR_MAHI

# Ajouter un point de montage pour sauvegarder les données temporaires
VOLUME /tmp

# Ajouter le fichier .jar de votre application
COPY target/SDISMap-0.0.3-SNAPSHOT.jar app.jar

# Exécuter l'application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
