# Définir une image de base
FROM eclipse-temurin:21.0.1_12-jre-alpine

# Ajouter un point de montage pour sauvegarder les données temporaires
VOLUME /tmp

# Ajouter le fichier .jar de votre application
ADD SDISMap-0.0.3-SNAPSHOT.jar app.jar

# Exécuter l'application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
