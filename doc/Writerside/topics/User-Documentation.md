# User Documentation

# Mobile

# Server
The server is divided into two parts:
- the REST API
- the processing backend

In this part of the documentation we will focus on the use of the API and its particular cases.

## How to use API ?
First, you need to know that a swagger is available `https://<your-address>/docs/swagger-ui/index.html`. Swagger is a list of all endpoints, with all return cases and needed body.
The API follows REST standards.

For most endpoints you need to authenticate.

### Authentification
The authentication process is quite simple. To make protected requests you must retrieve a token bearer.
This token is a JWT. You must enter it in the Authorization header.

To obtain this token, you need an account, an email and a password.

**POST /user/login**

Payload in JSON
```JSON
{
    "email": "yoursuperemail@test.fr",
    "password": "Mysuperpassword"
}
```
If this request is a success, return a **200** with this payload
```JSON
{
    "status": 200,
    "message": "OK",
    "data": "YourAuthToken"
}
```
Return **401** if given email/password is not valid
\
\
If you don't have an account, you can create it\
**POST /user/register**

Payload in JSON
```JSON
{
    "email": "yoursuperemail@test.fr",
    "username": "mysuperuser",
    "password": "mysuperpassword"
}
```
If this request is a success, return a **204**\
Return **400** if email is malformated\
Return **409** if email or username is already taken

### Standard response
All API responses are in **application/json** format and have at least the following body
```JSON
{
    "code": 200,
    "message": "OK"
}
```
For response **204, some 401 & 403** no body is given.

## Specials field

### FormInput
FormInput is an object representing a form field.
```JSON
{
    "name": "name_of_field",
    "label": "Label of field",
    "type": "TEXT",
    "value": "Hello World!"
}
```
FormInput can be of several types. Currently the available types are **TEXT**, **SELECT**, **NUMBER** and **URL**.\
Depending on the types chosen, a check will be carried out by the server during **POST requests** containing FormInput.\
For **SELECT** type, server gives a list of options, in string
```JSON
{
    "name": "name_of_field",
    "label": "Label of select field",
    "type": "SELECT",
    "options": ["Hello", "Test", "Hello World!"]
    "value": "Hello World!"
}
```

When you send POST request with FormInput, you need at least the name and value fields. If one of its two fields is absent, the query will necessarily return an error.

## Service
A service is a site/an application on which it is possible to perform actions/reactions from Area51.\
You can retrieve the list of all services via the **GET /service** endpoint.

### Services with auth
Some services require authentication to be used with Area51.\
Check **OAuth2** section for more informations.\

To check if service need auth, a field in the App object indicates whether there is a need for auth and if so, what the authentication method is (at the moment only OAuth2 is available).\
This field name is **hasAuthentification**, it's a boolean (true or false).\
Field for authentication method is **authMethod**. It's a enum, only value possible is oauth2 for the moment.

## OAuth2
**Warning**: Not all services need OAuth2, check **Services** section for more informations.
To be able to use the various services offered it is essential that the user is authorized Area51 to have used the service. To do this we use the OAuth2 principle. The user will be redirected to the service site and the service, once the user has accepted, will give us an access token.

### Init this protocol
To initiate this protocol you must request it from the API. To do this you need two things: the service slug and the link to which the user should be redirected after the end of the protocol.\
You also need a special auth token.

### Get temp auth token
To get this token you need to make a **GET request** on **/service/{slug}/oauth2/token**.\
This request return **200** with this response payload
```JSON
{
  "status": 200,
  "message": "OK",
  "data": "YourTempToken"
}
```

### Redirect URL
Your redirect URL need to support some parameters.\
**error** -> Error message given by server if the process went wrong\
**success** -> If everything is good !

Example redirect URL
```
https://localhost:8080/oauth2/callback?error=Fail%20to%20do
```

### Do request
**GET /service/{slug}/oauth2?redirecturi=yoururl&authToken=YourTokenGetBefore**\
This request will redirect to the third-party service site **302**.\
Return **401** if token is not valid.\
Can return **400**, if service doesn't exist.

# Web

