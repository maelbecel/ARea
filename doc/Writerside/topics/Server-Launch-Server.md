# Launch server

We will see how to configure and launch the server.

### Docker
The server is launched very easily with Docker!

To do this, you need to install Docker.
Follow this tutorial [directly on the docker website](https://docs.docker.com/engine/install/) (pay attention to the distro you use)

### application.properties

To get started, you will need to create a file named application.properties. This file will contain the entire server configuration.

You need to place it directly in the server folder of the project.

To be able to configure the server correctly, you need:
- An application for OAuth2 at:
    - Discord
    - Github
    - Twitch
    - Google
    - Notion
    - Spotify
- A MailJet API account

If you do not have one of these accounts the server will not be able to function 100%

Here is the configuration file to fill out
```
# Global configuration
server.forward-headers-strategy=framework
spring.application.name=Area51

# Error configuration
server.error.include-message=always
server.error.include-stacktrace=always
server.error.include-exception=true
server.error.whitelabel.enabled=false

# Gson configuration
spring.mvc.converters.preferred-json-mapper=gson
spring.gson.serialize-nulls=false

# SQL
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mariadb://${DB_HOST}:${DB_PORT}/${DB_NAME}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
# SQL Debug, remove for production
#spring.jpa.show-sql=true

# Encryption
area.encryption.key=<generate here a encryption key for your JwT tokens>

# Github
spring.security.oauth2.client.registration.github.client-id=<your github app client id>
spring.security.oauth2.client.registration.github.client-secret=<your github client secret>
spring.security.oauth2.client.registration.github.redirect-uri=${SERVER_BASE_URL}/service/github/callback
spring.security.oauth2.client.registration.github.scope=repo,gist,user:email
spring.security.oauth2.client.registration.github.authorization-grant-type=authorization_code
spring.security.oauth2.client.provider.github.authorization-uri=https://github.com/login/oauth/authorize
spring.security.oauth2.client.provider.github.token-uri=https://github.com/login/oauth/access_token

# Twitch
spring.security.oauth2.client.registration.twitch.client-id=<your twitch app client id>
spring.security.oauth2.client.registration.twitch.client-secret=<your twitch app client secret>
spring.security.oauth2.client.registration.twitch.redirect-uri=${SERVER_BASE_URL}/service/twitch/callback
spring.security.oauth2.client.registration.twitch.scope=chat:read,channel:read:subscriptions,moderator:read:followers
spring.security.oauth2.client.registration.twitch.authorization-grant-type=authorization_code
spring.security.oauth2.client.provider.twitch.authorization-uri=https://id.twitch.tv/oauth2/authorize
spring.security.oauth2.client.provider.twitch.token-uri=https://id.twitch.tv/oauth2/token

# Discord
spring.security.oauth2.client.registration.discord.client-id=<your discord app client id>
spring.security.oauth2.client.registration.discord.client-secret=<your discord app client secret>
spring.security.oauth2.client.registration.discord.redirect-uri=${SERVER_BASE_URL}/service/discord/callback
spring.security.oauth2.client.registration.discord.scope=email,identify
spring.security.oauth2.client.registration.discord.authorization-grant-type=authorization_code
spring.security.oauth2.client.provider.discord.authorization-uri=https://discord.com/oauth2/authorize
spring.security.oauth2.client.provider.discord.token-uri=https://discord.com/api/oauth2/token

# Notion
spring.security.oauth2.client.registration.notion.client-id=<your notion app client id>
spring.security.oauth2.client.registration.notion.client-secret=<your notion app client secret>
spring.security.oauth2.client.registration.notion.redirect-uri=${SERVER_BASE_URL}/service/notion/callback
spring.security.oauth2.client.registration.notion.scope=
spring.security.oauth2.client.registration.notion.authorization-grant-type=authorization_code
spring.security.oauth2.client.provider.notion.authorization-uri=https://api.notion.com/v1/oauth/authorize
spring.security.oauth2.client.provider.notion.token-uri=https://api.notion.com/v1/oauth/token

# Spotify
spring.security.oauth2.client.registration.spotify.client-id=<your spotify app client id>
spring.security.oauth2.client.registration.spotify.client-secret=<your spotify app client secret>
spring.security.oauth2.client.registration.spotify.redirect-uri=${SERVER_BASE_URL}/service/spotify/callback
spring.security.oauth2.client.registration.spotify.scope=playlist-read-private,playlist-read-collaborative
spring.security.oauth2.client.registration.spotify.authorization-grant-type=authorization_code
spring.security.oauth2.client.provider.spotify.authorization-uri=https://accounts.spotify.com/authorize
spring.security.oauth2.client.provider.spotify.token-uri=https://accounts.spotify.com/api/token

# Google
spring.security.oauth2.client.registration.google.client-id=<your google app client id>
spring.security.oauth2.client.registration.google.client-secret=<your google app client secret>
spring.security.oauth2.client.registration.google.redirect-uri=${SERVER_BASE_URL}/service/google/callback
spring.security.oauth2.client.registration.google.scope=profile,email,https://www.googleapis.com/auth/gmail.send,https://www.googleapis.com/auth/gmail.readonly
spring.security.oauth2.client.registration.google.authorization-grant-type=authorization_code
spring.security.oauth2.client.provider.google.authorization-uri=https://accounts.google.com/o/oauth2/v2/auth
spring.security.oauth2.client.provider.google.token-uri=https://oauth2.googleapis.com/token

# Mails
mailjet.api-key=<your mailjet api key>
mailjet.api-secret=<your mailjet api secret>

# Swagger
springdoc.api-docs.path=/docs/api-docs
# Swagger UI
springdoc.swagger-ui.path=/docs/swagger-ui
springdoc.swagger-ui.config-url=/docs/api-docs/swagger-config
springdoc.swagger-ui.url=/docs/api-docs
springdoc.swagger-ui.disable-swagger-default-url=true
```

When the configuration file is completed, you can launch the server!

### Launch server with docker

You should know that it is necessary to have a MariaDB/MySQL database to run the server.

Here is an example of docker-compose allowing the server to run correctly:
```yaml
version: '3.8'

services:
  db:
    image: mariadb:10.5
    restart: always
    volumes:
      - ./mariadb:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: gAYpHYhE23j4Qu
      MYSQL_DATABASE: area51
      MYSQL_USER: area51
      MYSQL_PASSWORD: bD8TEW2iwL6WbK
    ports:
      - 3306:3306

  server:
    image: area51/server:latest
    build: ./server
    restart: always
    ports:
      - 8080:8080
    depends_on:
      - db
    environment:
      - TZ=Europe/Paris
      - DB_HOST=db
      - DB_PORT=3306
      - DB_NAME=area51
      - DB_USER=area51
      - DB_PASSWORD=bD8TEW2iwL6WbK
      - SERVER_BASE_URL=http://localhost:8080
```
Some things you need to know:
- SERVER_BASE_URL will be used for different reasons in the server including webhook services allowing actions to be retrieved
- The passwords given in this example must be changed

Now to start the server use this command:
```Bash
docker compose up
```