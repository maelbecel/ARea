# Utilisation de l'image de base avec Node.js et Expo CLI pré-installés
FROM node:14

# Répertoire de travail
WORKDIR /app

# Copie des fichiers du projet dans le conteneur
COPY . .

# Installation des dépendances
RUN npm install -g expo-cli
RUN npm install

# Exécution de la commande Expo pour créer l'APK
RUN expo build:android

# Utilisation d'une image légère Alpine pour réduire la taille finale de l'image
FROM alpine:latest

# Installation des outils nécessaires pour Android
RUN apk --no-cache add openjdk11-jre bash

# Copie de l'APK depuis l'étape précédente
COPY --from=0 /app/android/app/build/outputs/apk/release/app-release.apk /app-release.apk

# Commande par défaut pour exécuter lorsqu'un conteneur est démarré
CMD ["bash"]
