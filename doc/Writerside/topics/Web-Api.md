# Web-Api

Here we have all components for API calls.
* [/action/\{slug}](#action-ts) [**GET**]
* [/action/info/\{slug}](#actioninfo-ts) [**GET**]
* [/reaction/\{slug}/\{actionSlug}](#reaction-ts) [**GET**]
* [/reaction/info/\{slug}](#reactioninfo-ts) [**GET**]
***
* [/applet](#applet-ts) [**POST**]
* [/applet/\{id}](#appletid-ts) [**GET**]
* [/applet/\{id}](#deleteapplet-ts) [**DELETE**]
* [/applet/\{id}](#appletpatch-ts) [**PATCH**]
* [/applet/me](#appletme-ts) [**GET**]
***
* [/service](#services-ts) [**GET**]
* [/service/\{slug}](#servicedetails-ts) [**GET**]
* [/service/\{slug}/oauth2](#oauth2delete-tsx) [**DELETE**]
* [/service/\{slug}/oauth2/token](#oauth2token-ts) [**GET**]
***
* [/user/verify](#verify-ts) [**GET**]
* [/user/login](#login-ts) [**POST**]
* [/user/register](#register-ts) [**POST**]
* [/user/me](#appletme-ts) [**GET**]
* [/user/me](#patchuser-ts) [**PATCH**]
* [/user/me](#deleteuser-ts) [**PATCH**]
***



## [Action.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/action/action.ts)

The function `GetActionInputs` is an asynchronous function that takes a `token` and `slug` parameter and returns a promise that resolves to an array of `Input` objects. It's used to have all inputs required by an action.
```typescript
const GetActionInputs = async (token: string, slug: string): Promise<any | null>
```

We start by checking the `token` and `slug` before calling the api.
```typescript
if (slug === null) {
    console.log("[GET] .../action/${slug}: slug is null");
    return null;
}
if (token === null) {
    console.log(`[GET] .../action/${slug}: token is null`);
    return null;
}
```

Then we ask the server on the route `GET /action/{slug}` to get the action info and turn it into a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/action/${slug}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Now we return the data the we get. The data is build like : 
* `slug`: The slug (string)
* `inputs`: The inputs list (Input[])

An input is build like : 
* `name`: The name of the input (string)
* `label`: The label of the input (string)
* `type`: The type of the input (string), the different possibility are (`TEXT`, `NUMBER`, `SELECT`)
* `options`: Here is the different options if the type is `SELECT` (string[])
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
   console.log(`[GET] .../action/${slug} (Error: ${data?.status}): \"${data?.message}\".`);
   return null;
}
```

For more information about this file you can check his complete code here : [action.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/action/action.ts)

## [ActionInfo.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/action/info.ts)

The function `GetActionInfo` is an asynchronous function that retrieves information about an action using a provided `token` and `slug`, including authentication and error handling.
```typescript
const GetActionInfo = async (token: string, slug: string): Promise<any | null>
```

We start by checking the `token` and `slug` before calling the api.
```typescript
if (slug === null) {
    console.log("[GET] .../action/${slug}: slug is null");
    return null;
}
if (token === null) {
    console.log(`[GET] .../action/${slug}: token is null`);
    return null;
}
```

Then we ask the server on the route `GET /action/info/{slug}` to get the action info and turn it into a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/action/info/${slug}`, {
    method: "GET",
    headers: {
       "Content-Type": "application/json",
       Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

We return then the data from the json.
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../action/info/${slug} (Error: ${data?.status}): \"${data?.message}\".`);
    return null;
}
```

For more information about this file you can check his complete code here : [ActionInfo.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/action/info.ts)

## [Reaction.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/reaction/reaction.ts)

The function `GetReactionInputs` is an asynchronous function that retrieves placeholders from a server based on a given `slug` and `actionSlug`, using a `token` for authorization.
```typescript
const GetReactionInputs = async (token: string, slug: string, actionSlug: string): Promise<any | null>
``` 

We start by checking the `token`, `slug` and `actionSlug` before calling the api.
```typescript
if (slug === null || actionSlug === null) {
    console.log("[GET] .../reaction/${slug}/${actionSlug}: slug or actionSlug is null");
    return null;
}

if (token === null) {
    console.log(`[GET] .../reaction/${slug}/${actionSlug}: token is null`);
    return null;
}
```

Then we ask the server on the route `GET /reaction/{slug}/{actionSlug}` to get the reaction info.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/reaction/${slug}/${actionSlug}`, {
    method: "GET",
    headers: {
       "Content-Type": "application/json",
       Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Now we return the data the we get. The data is build like : 
* `slug`: The slug (string)
* `inputs`: The inputs list (Input[])
* `placeholders`: All the placeholders that can be used in a input (any)

An input is build like : 
* `name`: The name of the input (string)
* `label`: The label of the input (string)
* `type`: The type of the input (string), the different possibility are (`TEXT`, `NUMBER`, `SELECT`)
* `options`: Here is the different options if the type is `SELECT` (string[])
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
   console.log(`[GET] .../reaction/${slug}/${actionSlug} (Error: ${data?.status}): \"${data?.message}\".`);
   return null;
}
```

For more information about this file you can check his complete code here : [Reaction.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/reaction/reaction.ts)

## [ReactionInfo.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/reaction/info.ts)

The function `GetReactionInfo` is an asynchronous function that retrieves information about an action using a provided `token` and `slug`, including authentication and error handling.
```typescript
const GetReactionInfo = async (token: string, slug: string): Promise<any | null>
```

We start by checking the `token` and `slug` before calling the api.
```typescript
if (slug === null || actionSlug === null) {
   console.log("[GET] .../reaction/${slug}/${actionSlug}: slug or actionSlug is null");
   return null;
}

if (token === null) {
   console.log(`[GET] .../reaction/${slug}/${actionSlug}: token is null`);
   return null;
}
```

Then we ask the server on the route `GET /reaction/info/{slug}` to get the action info and turn it into a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/reaction/${slug}/${actionSlug}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

We return then the data from the json.
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../reaction/${slug}/${actionSlug} (Error: ${data?.status}): \"${data?.message}\".`);
    return null;
}
```

For more information about this file you can check his complete code here : [ReactionInfo.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/reaction/info.ts)

## [Applet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

The function `CreateApplet` is an asynchronous function that takes in various parameters related to an applet, logs them to the console, and makes a POST request to a server with the provided data. Here are the different parameters:
* `token` is a `string`. It's allow the user to get authentificated by the api.
* `body` as `any`.
* `router` as `NextRouter`. It's allow the api to redirect the user, only, if the call succed.

`body` contain all is value:
* `name` is a `string`. It's literally the name of the applet you want to create.
* `actionSlug` is a `string`. It's the `slug` of the action of the applet.
* `actionInputs` is an `Input[]`. The `actionInputs` parameter is an array of objects that represent the inputs required for the action.
* `notifUser` is a `boolean`. It's for know if the applet create will send notification to the user when a event has proke.
* `reactions` is a `ReactionApplet[]`. The `reactions` parameters is an array of ReactionApplet that represent a reaction with `slug` and `inputs`.
This function return `Promise<boolean>`, a boolean false in case of error, or the true on a succed.

```typescript
const CreateApplet = async (token: string, body: any, router: NextRouter): Promise<boolean>
```

We start by checking the `token` before calling the api.
```typescript
if (token === null) {
   console.log("[POST] .../applet: token is null");
   return false;
}
```

We can now send the request to `POST /applet` and get the result in json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet`, {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
       Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(body)
});

const data = await response.json();
```

We return then the data from the json.
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 201) {
    console.log(`[POST] .../applet (Error: ${data?.status}): \"${data?.message}\".`);
    return false;
}
```

For more information about this file you can check his complete code here : [Applet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [AppletID.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

The `GetAppletWithID` components is used to get informations about an applet and take the user `token` and applet `id` as parameter

```typescript
const GetAppletWithID = async (token: string, id: string): Promise<any | null>
```

We start by checking the `token` before calling the api.
```typescript
if (id === null) {
    console.log(`[GET] .../applet/{id}: id is null`);
    return null;
}

if (token === null) {
    console.log(`[GET] .../applet/${id}: token is null`);
    return null;
}
```

We can now request the API at `GET /applet/{id}` and turn the result in a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await res
```

Now we just have to return the json data 
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
    return null;
}
```

For more information about this file you can check his complete code here : [AppletID.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [DeleteApplet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

The call `DeleteAppletWithID` is used to delete an applet by his `id`.
```typescript
const DeleteAppletWithID = async (token: string, id: string): Promise<boolean>
```

We start by checking the `token` and `id` before calling the api.
```typescript
const DeleteAppletWithID = async (token: string, id: string): Promise<boolean> => {
if (id === null) {
    console.log(`[DELETE] .../applet/{id}: id is null`);
    return false;
}

if (token === null) {
    console.log(`[DELETE] .../applet/${id}: token is null`);
    return false;
}
```

We can now request the API at `DELETE /applet/{id}`.
```typescript
await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});
```

For more information about this file you can check his complete code here : [DeleteApplet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [AppletPatch.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

The function `UpdateAppletWithID` is an asynchronous function that takes in various parameters related to an applet, logs them to the console, and makes a PATCH request to a server with the provided data. Here are the different parameters:
* `token` is a `string`. It's allow the user to get authentificated by the api.
* `id` is a `string`. It's the id of the applet you want to update.
* `body` as `any`.

`body` contain all is value:
* `name` is a `string`. It's literally the name of the applet you want to create.
* `actionSlug` is a `string`. It's the `slug` of the action of the applet.
* `actionInputs` is an `Input[]`. The `actionInputs` parameter is an array of objects that represent the inputs required for the action.
* `notifUser` is a `boolean`. It's for know if the applet create will send notification to the user when a event has proke.
* `reactions` is a `ReactionApplet[]`. The `reactions` parameters is an array of ReactionApplet that represent a reaction with `slug` and `inputs`.
This function return `Promise<boolean>`, a boolean false in case of error, or the true on a succed.
```typescript
const UpdateAppletWithID = async (token: string, id: string, body: object): Promise<boolean>
```

We start by checking the `token` and the `id` before calling the api.
```typescript
if (id === null) {
    console.log(`[PATCH] .../applet/{id}: id is null`);
    return false;
}

if (token === null) {
    console.log(`[PATCH] .../applet/${id}: token is null`);
    return false;
}
```

We can now send the request to `PATCH /applet/{id}` and get the result in json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(body)
});

const data = await response.json();
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[PATCH] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
    return false;
}
```

For more information about this file you can check his complete code here : [AppletPatch.tsx](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [UpdateApplet.tsx](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

Update an applet with a specific ID by sending a PATCH request to the server. With a function that take the user `token`, the applet `id` and the new `title`.
```typescript
const UpdateAppletTitleWithID = async (token: string, id: string, title: string ): Promise<boolean>
```

We start by checking the `token`, the `id` and the `title` before calling the api.
```typescript
if (id === null) {
    console.log(`[PATCH] .../applet/{id}: id is null`);
    return false;
}

if (token === null) {
    console.log(`[PATCH] .../applet/${id}: token is null`);
    return false;
}

if (title === null || title === "") {
    console.log(`[PATCH] .../applet/${id}: title is null`);
    return false;
}
```

We can now request the API at `PATCH /applet/{id}` and turn the result in a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    },
    body: JSON.stringify({
        name: title,
    })
});

const data = await response.json();
```

Now we just have to return the data from the json
```typescript
return json.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[PATCH] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
    return false;
}
```

For more information about this file you can check his complete code here : [UpdateApplet.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/applet.ts)

## [AppletMe.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/me.ts)

The `GetMyApplets` components is used to get informations about the applets of the user
```typescript
const GetMyApplets = async (token: string): Promise<any[]>
```

We start by checking the `token` before calling the api.
```typescript
if (token === null) {
    console.log(`[GET] .../applet/me: token is null`);
    return [];
}
```

We can now request the API at `GET /applet/me` and turn the result in a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/applet/me`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Now we just have to return the data 
```typescript
return data?.data;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../applet/me (Error: ${data?.status}): \"${data?.message}\".`);
    return [];
}
```

For more information about this file you can check his complete code here : [AppletMe.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/applet/me.ts)

## [Services.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/service/service.ts)

The function `GetServices` is an asynchronous function that retrieves a list of diffrent service from a server and returns them as an array of `Service` objects.
```typescript
const GetServices = async (token: string): Promise<Service[]>
```

```typescript
export interface Service {
    name: string;
    slug: string;
    actions: any[];
    reactions: any[];
    decoration: {
        logoUrl: string;
        backgroundColor: string;
    };
    hasAuthentification: boolean;
};
```

We start by checking the `token` before calling the api.
```typescript
if (token === null) {
    console.log("[GET] .../service: token is null");
    return [];
}
```

We can now request the API at `GET /service` and turn the result in a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/service`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

We can now return the array.
```typescript
return data?.data as Service[];
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../service (Error: ${data?.status}): \"${data?.message}\".`);
    return [];
}
```

For more information about this file you can check his complete code here : [Services.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/service/service.ts)

## [ServiceDetails.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/service/service.ts)

The `GetService` components is used to get informations about a service and take the service `slug` as parameter and a `token` for authentification.
```typescript
const GetService = async (token: string, slug: string): Promise<Service | null>
```

We start by checking the `token` before calling the api.
```typescript
if (token === null) {
    console.log("[GET] .../service: token is null");
    return [];
}
```

We can now request the API at `GET /service/{slug}` and turn the result in a json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/service`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Now we just have to return the data into a `Service` object.
```typescript
return data?.data as Service[];
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../service (Error: ${data?.status}): \"${data?.message}\".`);
    return [];
}
```

For more information about this file you can check his complete code here : [AppletDetails.tsx](https://github.com/maelbecel/ARea/blob/master/web/utils/api/service/service.ts)

## [OAuth2Delete.tsx](https://github.com/maelbecel/ARea/blob/master/web/utils/api/service/oauth2.ts)

The `DeleteOAuth2Token` components is used to delete the existing OAuth token for a service.
```typescript
const DeleteOAuth2Token = async (token: string, slug: string): Promise<boolean>
```

We start by checking the `token` and the `slug` before calling the api.
```typescript
if (slug === null) {
    console.log("[DELETE] .../service/{slug}/oauth2: slug is null.");
    return false;
}

if (token === null) {
    console.log(`[DELETE] .../service/${slug}/oauth2: token is null.`);
    return false;
}
```

We can now request the API at `DELETE/service/{service}/oauth2`.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/service/${slug}/oauth2`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`,
    }
});
```

Now we just have to return true if everything is good, or false if there is an error.
In the case that the request failed we catch errors.
```typescript
if (response?.status !== 204) {
    console.log(`[DELETE] .../service/${slug}/oauth2 (Error: ${response?.status}): \"${response?.statusText}\".`);
    return false;
}
```

For more information about this file you can check his complete code here : [OAuth2Delete.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/service/oauth2.ts)

## [OAuth2Token.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/service/oauth2.ts)

The function `OAuth2GetToken` is an asynchronous function that retrieves a service token from an API endpoint using a provided `slug`.
```typescript
const OAuth2GetToken = async (token: string, slug: string): Promise<string | null>
```

We start by checking the `token` and the `slug` before calling the api.
```typescript
if (slug === null) {
    console.log("[GET] .../service/{slug}/oauth2/token: slug is null.");
    return null;
}

if (token === null) {
    console.log(`[GET] .../service/${slug}/oauth2/token: token is null.`);
    return null;
}
```

Then we can make a request to the API `GET /service/{slug}/oauth2/token` and turn it into json.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/service/${slug}/oauth2/token`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`,
    }
});

const data = await response.json();
```

We can finnaly return the data of the json
```typescript
return data?.data as string;
```

In the case that the request failed we catch errors and return false
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../service/${slug}/oauth2/token (Error: ${data?.status}): \"${data?.message}\".`);
    return null;
}
```

For more information about this file you can check his complete code here : [OAuth2Token.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/service/oauth2.ts)

## [Verify.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/verify.ts)

The `VerifyUserToken` components is used to check if the user is have a valid token or not.
```typescript
const VerifyUserToken = async (token: string): Promise<string | null>
```

We start by checking the `token` exist or not.
```typescript
if (token === null) {
    console.log("[GET] .../user/verify: token is null");
    return null;
}
```

Then we can make a request to the API passing the token in argument.
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/user/verify`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Finnaly we check if it's ok or not
```typescript
if (data?.status === 401) {
    console.log("[GET] .../user/verify (Error: 401): \"Token is invalid\".");
    localStorage.removeItem("token");
    return null;
}
return token;
```

For more information about this file you can check his complete code here : [Verify.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/verify.ts)

## [Login.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/login.ts)

The `UserLogin` component is used to call the api to login the user while knowing the `email` and the `password`.
The function return a `string`, that will represent the `token` of the user.
```typescript
const UserLogin = async (email: string, password: string): Promise<string | null>
```

We start by checking the `email` and the `password` are not empty or null, before calling the api.
```typescript
if (email === null || password === null) {
    console.log("[POST] .../user/login: email or password is null");
    return null;
}
```

Then we can call `POST /user/login` and get result in json
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/user/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email   : email,
        password: password
    })
});

const data = await response.json();
```

Return the token
```typescript
return data?.data as string;
```

In the case that the request failed we catch errors
```typescript
if (data?.status === 401) {
    console.log("[POST] .../user/login (Error: 401): \"Bad Credentials\".");
    localStorage.removeItem("token");
    return null;
}
```

For more information about this file you can check his complete code here : [Login.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/login.ts)

## [Register.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/register.ts)

The `UserRegister` component is used to call the api to login the user while knowing the `email`, `username` and the `password`.
The function return a `string`, that will represent the `token` of the user.
```typescript
const UserRegister = async (email: string, username: string, password: string): Promise<string | null>
```

We start by checking the `email`, `username` and the `password` are not empty or null, before calling the api.
```typescript
 if (email === null || username === null || password === null) {
    console.log("[POST] .../user/register: email, username or password is null");
    return null;
}
```

Then we can call `POST /user/login` and get result in json
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/user/register`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email   : email,
        username: username,
        password: password
    })
});

const data = await response.json();
```

Return the token
```typescript
return data?.data as string;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[POST] .../user/register (Error: ${data?.status}): \"${data?.message}\".`);
    localStorage.removeItem("token");
    return null;
}
```

For more information about this file you can check his complete code here : [Register.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/register.ts)

## [UserInfos.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/me.ts)

The function `GetProfile` is an asynchronous function that makes a GET request to a server endpoint `/user/me` with a token and server address, and returns the response data or displays an error message if there is an error.
```typescript
const GetProfile = async (token: string): Promise<UserProfile | null>
```

UserProfile type is defined as follows:
```typescript
export interface UserProfile {
    connectedServices: Array<string>;
    email: string;
    id: number;
    passwordLength: number;
    username: string;
    loginWithService: boolean;
};
```

We start by checking the `token` before calling the api.
```typescript
if (token === null) {
    console.log("[GET] .../user/me: token is null");
    return null;
}
```

We can now make a request to the API at `GET /user/me` and turn the result in json
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/user/me`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    }
});

const data = await response.json();
```

Finnaly we return the result
```typescript
return data?.data as UserProfile;
```

In the case that the request failed we catch errors
```typescript
if (data?.status !== 200) {
    console.log(`[GET] .../user/me (Error: ${data?.status}): \"${data?.message}\".`);
    return null;
}
```

For more information about this file you can check his complete code here : [UserInfos.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/me.ts)

## [PatchUser.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/me.ts)

The function for patch the user are asynchronous function that sends a PATCH request to update user information (email, password, and username) to a server using the provided server address and token.
```typescript
const PatchProfile = async (token: string, email: string, username: string): Promise<UserProfile | null>
const PatchProfilePassword = async (token: string, password: string, confirmPassword: string, newPassword: string): Promise<UserProfile | null>
```

We start by checking the all the parameters before calling the api.
```typescript
if (token === null) {
    console.log("[PATCH] .../user/me: token is null");
    return null;
}

// --- PatchProfile --- //
if (email === null || username === null || email === "" || username === "") {
    console.log("[PATCH] .../user/me: email, username or password is null");
    return null;
}

// --- PatchProfilePassword --- //
if (password === null || password === "") {
    console.log("[PATCH] .../user/me: password is null");
    return null;
}

if (newPassword !== confirmPassword ||
    (newPassword === "" && confirmPassword === "") || 
    (newPassword == password)) {
    console.log("Passwords don't match");
    return null;
}
```

We can now make a request to the API at `PATCH /user/me` and turn the result in json
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/user/me`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
    },
    // --- PathProfile --- //
    body: JSON.stringify({
        email   : email,
        username: username,
    })
    // --- PathProfilePassword --- //
    body: JSON.stringify({
        password: password
    })
});

const data = await response.json();
```

Finnaly we return the result
```typescript
return data?.data as UserProfile;
```

In the case that the request failed we catch errors
```typescript
if (data?.status === 400) {
    console.log("[PATCH] .../user/me (Error: 400): \"Bad format email\".");
    return null;
}
```

For more information about this file you can check his complete code here : [PatchUser.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/me.ts)

## [DeleteUser.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/me.ts)

The function `DeleteProfile` is an asynchronous function that makes a DELETE request to a server endpoint `/user/me` with a token and server address, and returns the response data or displays an error message if there is an error.
```typescript
const DeleteProfile = async (token: string, router: NextRouter): Promise<boolean>
```

We start by checking the `token` before calling the api.
```typescript
if (token === null) {
    console.log("[DELETE] .../user/me: token is null");
    return false;
}
```

We can now make a request to the API at `PATCH /user/me` and turn the result in json
```typescript
const response = await fetch(`${localStorage.getItem("address") as string}/user/me`, {
    method: "DELETE",
    headers: {
        Authorization : `Bearer ${token}`
    }
});
```

Finnaly we return true if everything is good, or false if there is an error.
In the case that the request failed we catch errors
```typescript
if (response.status === 400) {
    console.log("[DELETE] .../user/me (Error: 400): \"Bad user id\".");
    return false;
}
return true;
```

For more information about this file you can check his complete code here : [DeleteUser.ts](https://github.com/maelbecel/ARea/blob/master/web/utils/api/user/me.ts)
