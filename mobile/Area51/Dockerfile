FROM node:16

# Install OpenJDK 17 & Android SDK
ARG JDK_VERSION=11
RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install -y --no-install-recommends ca-certificates-java openjdk-${JDK_VERSION}-jdk && \
    apt-get install -y --no-install-recommends git wget unzip libncurses5 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# download and install Android SDK
# https://developer.android.com/studio#command-line-tools-only
ARG ANDROID_SDK_VERSION=10406996
ENV ANDROID_HOME /opt/android-sdk
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_VERSION}_latest.zip && \
    unzip *tools*linux*.zip -d ${ANDROID_HOME}/cmdline-tools && \
    mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/tools && \
    rm *tools*linux*.zip

# set the environment variables
ENV JAVA_HOME /usr/lib/jvm/java-${JDK_VERSION}-openjdk-amd64
ENV PATH ${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/cmdline-tools/tools/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator

# accept the license agreements of the SDK components
ADD license_accepter.sh /opt/
RUN chmod +x /opt/license_accepter.sh && /opt/license_accepter.sh $ANDROID_HOME

# Répertoire de travail
WORKDIR /app

# Copie des fichiers du projet dans le conteneur
COPY . .

ENV EXPO_TOKEN="hjTkfrRg_eaYsNB0IBHRJqrWvq3-_fsIa_jyBnUI"
ENV EAS_NO_VCS=1

# Installation des dépendances
RUN npm install
RUN npm install -g eas-cli

# Création du dossier de sortie
RUN mkdir /output

# Exécution de la commande Expo pour créer l'APK
RUN eas build --platform android --profile preview --local --non-interactive

CMD cp /app/build-*.apk /output/app.apk && \
    ls -l /output && \
    echo "APK généré dans le dossier /output"
